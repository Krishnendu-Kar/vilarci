import csv
import random
from datetime import datetime, timedelta, timezone

# --- Configuration ---
NUM_PRODUCTS = 250
START_ID = 101000000331
SELLERS = [30123650001, 110010100001]

# Valid IDs
CATEGORIES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
SUB_CATEGORIES = [
    101, 102, 103, 104, 105, 106, 107, 108, 109, 115, 116, 117, 118, 125, 126, 127, 
    135, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 
    155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 170, 171, 172, 173, 
    174, 175, 176, 177, 178, 179, 185, 186, 187, 188, 189, 190, 191
]

def generate_csv(filename):
    headers = [
        'name', 'slug', 'description', 'badge_label', 'tags', 'category_id',
        'sub_category_id', 'super_sub_id', 'base_price', 'original_price',
        'stock_quantity', 'is_active', 'images', 'highlights', 'specifications',
        'variants', 'bulk_rules', 'rating_avg', 'rating_count', 'created_at',
        'id', 'seller_id', 'amount', 'delivery_class', 'is_free_delivery',
        'refund_days', 'replacement_days', 'max_delivery_time', 'is_rapid_eligible',
        'is_pickup_eligible'
    ]

    # Base timestamp set to current UTC time
    base_time = datetime.now(timezone.utc)

    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(headers)

        for i in range(NUM_PRODUCTS):
            prod_id = START_ID + i
            seller_id = SELLERS[i % 2]
            cat_id = random.choice(CATEGORIES)
            sub_cat_id = random.choice(SUB_CATEGORIES)
            
            # Create a unique, perfectly formatted Postgres timestamp for each row
            # Format: YYYY-MM-DD HH:MM:SS.mmmmmm+00
            row_time = base_time - timedelta(minutes=(NUM_PRODUCTS - i))
            pg_timestamp = row_time.strftime('%Y-%m-%d %H:%M:%S.%f') + '+00'

            # Toggle booleans based on even/odd rows for variety
            is_even = (i % 2 == 0)

            row = [
                f"Vilarci Load Test {prod_id - START_ID + 331}", # name
                f"vtest-{prod_id}",                              # slug
                "Architecture load test item.",                  # description
                "Demo",                                          # badge_label
                '["load_test"]',                                 # tags (Python dicts/lists escape securely here)
                cat_id,                                          # category_id
                sub_cat_id,                                      # sub_category_id
                '',                                              # super_sub_id (left null)
                199,                                             # base_price
                299,                                             # original_price
                1000,                                            # stock_quantity
                'true',                                          # is_active
                '["https://picsum.photos/100"]',                 # images
                '[]',                                            # highlights
                '{}',                                            # specifications
                '',                                              # variants
                '',                                              # bulk_rules
                0,                                               # rating_avg
                0,                                               # rating_count
                pg_timestamp,                                    # perfectly mapped date
                prod_id,                                         # id
                seller_id,                                       # seller_id
                '',                                              # amount
                'standard' if is_even else 'rapid',              # delivery_class
                'true' if is_even else 'false',                  # is_free_delivery
                7,                                               # refund_days
                7,                                               # replacement_days
                1,                                               # max_delivery_time
                'true' if is_even else 'false',                  # is_rapid_eligible
                'true'                                           # is_pickup_eligible
            ]
            writer.writerow(row)

if __name__ == "__main__":
    generate_csv('vilarci_load_test.csv')
    print(f"Success: {NUM_PRODUCTS} rows generated in 'vilarci_load_test.csv'")