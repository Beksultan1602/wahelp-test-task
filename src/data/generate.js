const items = [];
for (let i = 0; i < 10000; i++) {
    items.push({
        id: i,
        name: `Item ${i}`,
        price: Math.random() * 100,
        image: `path/to/image_${i}.jpg`,
        level: Math.floor(Math.random() * 10)
    });
}

export default items;

