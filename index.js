const OpenAI = require('openai');
const readline = require('readline');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    baseURL: process.env.OPENAI_BASE
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function generateBatch(columns, batchSize, iteration) {
    try {
        const prompt = `Azərbaycan dilində ${batchSize} ədəd akademik test sualı və onların cavablarını yarat.
        Suallar müxtəlif sahələrdən (riyaziyyat, fizika, kimya, biologiya, tarix, ədəbiyyat və s.) olmalıdır.
        Suallar məntiqi və təhsil səviyyəsinə uyğun olmalıdır.
        Hər sual unikal olmalıdır.
        Cavablar qısa və konkret olmalıdır.
        Bu ${iteration}-ci partiyadır, əvvəlki suallardan fərqli suallar yarat.

        Nümunə format:
        Nyutonun ikinci qanunu nəyi ifadə edir?
        Cismin təcili ona təsir edən qüvvə ilə düz, kütləsi ilə tərs mütənasibdir.`;

        const completion = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'Siz akademik test sualları və cavabları generatoru kimi fəaliyyət göstərirsiniz.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.9
        });

        const generatedText = completion.choices[0].message.content;
        const pairs = generatedText.split('\n\n').filter(pair => pair.trim() !== '');

        return pairs.map(pair => {
            const lines = pair.split('\n');
            const question = lines[0].trim(); 
            const answer = lines[1].replace(/^Cavab:\s*/, '').trim();
            return {
                'sual': question,
                'cavab': answer
            };
        });
    } catch (error) {
        console.error('Batch generation error:', error);
        return [];
    }
}

async function generateRemainingData(uniqueData, columns, batchSize, totalRows) {
    while (uniqueData.length < totalRows) {
        console.log(`Əlavə məlumatlar generasiya edilir... (${uniqueData.length}/${totalRows})`);
        const remainingCount = totalRows - uniqueData.length;
        const additionalData = await generateBatch(columns, Math.min(batchSize, remainingCount), 'əlavə');
        const newUniqueData = additionalData.filter(newItem =>
            !uniqueData.some(existingItem =>
                JSON.stringify(existingItem) === JSON.stringify(newItem)
            )
        );
        uniqueData.push(...newUniqueData);
    }
    return uniqueData.slice(0, totalRows);
}

async function generateData(columns, totalRows) {
    const batchSize = 10; // Hər partiyada 10 sual
    const batches = Math.ceil(totalRows / batchSize);
    let allData = [];

    console.log(`${totalRows} sual-cavab ${batches} partiyada yaradılacaq...`);

    for (let i = 0; i < batches; i++) {
        console.log(`${i + 1}-ci partiya generasiya edilir...`);
        const currentBatchSize = Math.min(batchSize, totalRows - (i * batchSize));
        const batchData = await generateBatch(columns, currentBatchSize, i + 1);
        allData = [...allData, ...batchData];

        console.log(`${allData.length}/${totalRows} sual-cavab tamamlandı`);
    }


    const uniqueData = Array.from(new Set(allData.map(JSON.stringify))).map(JSON.parse);
    return await generateRemainingData(uniqueData, columns, batchSize, totalRows);
}

async function main() {
    try {
        const columns = ['sual', 'cavab'];
        console.log('Neçə sual-cavab generasiya edilsin?');
        let rowCount = await new Promise(resolve => rl.question('', resolve));
        rowCount = parseInt(rowCount);

        if (isNaN(rowCount) || rowCount <= 0) {
            console.log('Xəta: Düzgün rəqəm daxil edin');
            return;
        }

        console.log(`${rowCount} sual-cavab generasiya edilir...`);
        const data = await generateData(columns, rowCount);

        const csvWriter = createCsvWriter({
            path: 'dataset.csv',
            header: columns.map(column => ({ id: column, title: column })),
            encoding: 'utf8'
        });

        await csvWriter.writeRecords(data);

        console.log(`${data.length} sual-cavab uğurla CSV faylına yazıldı: dataset.csv`);
    } catch (error) {
        console.error('Xəta baş verdi:', error);
    } finally {
        rl.close();
    }
}

main();
