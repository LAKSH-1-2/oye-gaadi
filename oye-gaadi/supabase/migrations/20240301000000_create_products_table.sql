create table products (
  id bigint primary key generated always as identity,
  name text not null,
  description text,
  price decimal(10,2) not null,
  category text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create an index on the category column for faster searches
CREATE INDEX products_category_idx ON products(category);

-- Add some sample products
INSERT INTO products (name, description, price, category, image_url) VALUES
('High Performance Brake Pads', 'Premium ceramic brake pads for superior stopping power', 2499.99, 'Brake Systems', 'https://example.com/brake-pads.jpg'),
('Engine Oil Filter', 'Advanced filtration for maximum engine protection', 299.99, 'Engine Parts', 'https://example.com/oil-filter.jpg'),
('Suspension Coil Springs', 'Heavy-duty springs for improved handling', 3999.99, 'Suspension', 'https://example.com/springs.jpg'),
('LED Headlight Assembly', 'Bright and energy-efficient headlight replacement', 5999.99, 'Body Parts', 'https://example.com/headlight.jpg');