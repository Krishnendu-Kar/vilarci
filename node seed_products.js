const fs = require('fs');

// Vilarci Required Configurations
const START_ID = 101000000131; // Starting exactly where the manual batch left off
const ROWS_TO_GENERATE = 150; // Change this to 10000 when you want to truly stress test
const SELLERS = [30123650001, 110010100001];

// Valid IDs pulled directly from your schema requirements
const CATEGORY_IDS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const SUB_CATEGORY_IDS = [101, 102, 103, 104, 105, 106, 107, 108, 109, 115, 116, 117, 118, 125, 126, 127, 135, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 185, 186, 187, 188, 189, 190, 191];

const CSV_HEADER = 'name,slug,description,badge_label,tags,category_id,sub_category_id,super_sub_id,base_price,original_price,stock_quantity,is_active,images,highlights,specifications,variants,bulk_rules,rating_avg,rating_count,created_at,id,seller_id,amount,delivery_class,is_free_delivery,refund_days,replacement_days,max_delivery_time,is_rapid_eligible,is_pickup_eligible\n';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

let csvContent = CSV_HEADER;

for (let i = 0; i < ROWS_TO_GENERATE; i++) {
    const id = START_ID + i;
    const name = `Demo Product Model ${id}`;
    const slug = `demo-product-${id}`;
    const description = `This is a generated description for product ${id}.`;
    const badge_label = getRandomItem(["Bestseller", "New", "Sale", "Trending", "Featured"]);
    const tags = `"[""generated"",""test""]"`; // Escaped array string for CSV
    const category_id = getRandomItem(CATEGORY_IDS);
    const sub_category_id = getRandomItem(SUB_CATEGORY_IDS);
    const super_sub_id = ''; // Left null intentionally for generated flex data
    const base_price = getRandomInt(100, 5000);
    const original_price = base_price + getRandomInt(100, 1000);
    const stock_quantity = getRandomInt(0, 1000);
    const is_active = 'true';
    const images = `"[""https://picsum.photos/400""]"`;
    const highlights = `"[""High Quality"",""Durable""]"`;
    const specifications = `"{""Material"":""Mixed""}"`;
    const variants = '';
    const bulk_rules = '';
    const rating_avg = (Math.random() * (5 - 3) + 3).toFixed(1);
    const rating_count = getRandomInt(0, 5000);
    const created_at = '2026-03-10 18:00:00+00';
    const seller_id = SELLERS[i % 2];
    const amount = '';
    const delivery_class = getRandomItem(['standard', 'rapid']);
    const is_free_delivery = getRandomItem(['true', 'false']);
    const refund_days = 7;
    const replacement_days = 7;
    const max_delivery_time = getRandomInt(1, 5);
    const is_rapid_eligible = is_free_delivery === 'true' ? 'true' : 'false';
    const is_pickup_eligible = 'true';

    const row = `${name},${slug},${description},${badge_label},${tags},${category_id},${sub_category_id},${super_sub_id},${base_price},${original_price},${stock_quantity},${is_active},${images},${highlights},${specifications},${variants},${bulk_rules},${rating_avg},${rating_count},${created_at},${id},${seller_id},${amount},${delivery_class},${is_free_delivery},${refund_days},${replacement_days},${max_delivery_time},${is_rapid_eligible},${is_pickup_eligible}\n`;
    
    csvContent += row;
}

fs.writeFileSync('vilarci_bulk_products.csv', csvContent, 'utf8');
console.log(`Successfully generated ${ROWS_TO_GENERATE} products into vilarci_bulk_products.csv`);