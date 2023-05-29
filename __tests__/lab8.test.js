describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
	await page.goto('https://cse110-f2021.github.io/Lab8_Website');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
	console.log('Checking for 20 product items...');
	// Query select all of the <product-item> elements and return the length of that array
	const numProducts = await page.$$eval('product-item', (prodItems) => {
	  return prodItems.length;
	});
	// Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
	expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
	console.log('Checking to make sure <product-item> elements are populated...');
	// Start as true, if any don't have data, swap to false
	let allArePopulated = true;
	let data, plainValue;
	// Query select all of the <product-item> elements
	const prodItems = await page.$$('product-item');
	console.log(`Checking product item 1/${prodItems.length}`);
	
	for (let item of prodItems) {
		// Grab the .data property of <product-items> to grab all of the json data stored inside
		data = await item.getProperty('data');
		// Convert that property to JSON
		plainValue = await data.jsonValue();
		// Make sure the title, price, and image are populated in the JSON
		if (plainValue.title.length == 0 ||
			plainValue.price.length == 0 ||
			plainValue.image.length == 0) { allArePopulated = false; }
	}
	// Expect allArePopulated to still be true
	expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
	console.log('Checking the "Add to Cart" button...');
	const checkContent = _=>document.querySelector("product-item").shadowRoot.querySelector("button").textContent;
	let buttonContent = await page.evaluate(checkContent);
	expect(buttonContent).toBe("Add to Cart");
	// Click the button
	await page.evaluate(_=>document.querySelector("product-item").shadowRoot.querySelector("button").click());
	buttonContent = await page.evaluate(checkContent);
	// Expect button content to change
	expect(buttonContent).toBe("Remove from Cart");
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
	console.log('Checking number of items in cart on screen...');
	await page.evaluate(_=>[...document.querySelectorAll("product-item")].map(e=>e.shadowRoot.querySelector("button")).map(e=>{if (e.textContent === "Add to Cart") {e.click()}}));
	let cartCount = parseInt(await page.evaluate(_=>document.querySelector("#cart-count").textContent));
	expect(cartCount).toBe(20);
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
	console.log('Checking number of items in cart on screen after reload...');
	await page.reload();
	let buttons = await page.evaluate(_=>[...document.querySelectorAll("product-item")].map(e=>e.shadowRoot.querySelector("button")).map(e=>e.textContent));
	let buttonSet = new Set(buttons);
	
	expect(buttonSet.size).toBe(1);
	expect(buttonSet.has("Remove from Cart")).toBe(true);
	let cartCount = parseInt(await page.evaluate(_=>document.querySelector("#cart-count").textContent));
	expect(cartCount).toBe(20);
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
	let cart = await page.evaluate(_=>JSON.parse(localStorage.getItem("cart")));
	expect(cart.length).toBe(20);
	for (let i = 1; i <= 20; i++) {
		expect(cart.includes(i)).toBe(true);
	}
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
	console.log('Checking number of items in cart on screen...');
	await page.evaluate(_=>[...document.querySelectorAll("product-item")].map(e=>e.shadowRoot.querySelector("button")).map(e=>{if (e.textContent === "Remove from Cart") {e.click()}}));
	let cartCount = parseInt(await page.evaluate(_=>document.querySelector("#cart-count").textContent));
	expect(cartCount).toBe(0);
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
	console.log('Checking number of items in cart on screen after reload...');
	await page.reload();
	let buttons = await page.evaluate(_=>[...document.querySelectorAll("product-item")].map(e=>e.shadowRoot.querySelector("button")).map(e=>e.textContent));
	let buttonSet = new Set(buttons);
	
	expect(buttonSet.size).toBe(1);
	expect(buttonSet.has("Add to Cart")).toBe(true);
	let cartCount = parseInt(await page.evaluate(_=>document.querySelector("#cart-count").textContent));
	expect(cartCount).toBe(0);
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
	console.log('Checking the localStorage...');
	let cart = await page.evaluate(_=>JSON.parse(localStorage.getItem("cart")));
	expect(cart.length).toBe(0);
  });
});
