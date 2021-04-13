class Product {

    constructor(title, image, desc, price, stock) {
      this.title = title;
      this.imageUrl = image;
      this.description = desc;
      this.price = price;
      this.stock = stock;
    }
  }
  
  class ElementAttribute {
    constructor(attrName, attrValue) {
      this.name = attrName;
      this.value = attrValue;
    }
  }
  
  class CommonFunctionality {
    constructor(renderHookId) {
      this.hookId = renderHookId;
    }
  
    createRootElement(tag, cssClasses, attributes) {
      const rootElement = document.createElement(tag);
      if (cssClasses) {
        rootElement.className = cssClasses;
      }
      if (attributes && attributes.length > 0) {
        for (const attr of attributes) {
          rootElement.setAttribute(attr.name, attr.value);
        }
      }
      document.getElementById(this.hookId).append(rootElement);
      return rootElement;
    }
  }
  
  class ShoppingCart extends CommonFunctionality {
    items = [];
    // quantityCounter = 0;
  
    set cartItems(value) {
      this.items = value;
      this.totalOutput.innerHTML = `<h2 class= "TotalPr">Total Price: \$${this.totalAmount.toFixed(
        2
      )}</h2>`;
    }
  
    get totalAmount() {
      const sum = this.items.reduce(
        (prevValue, curItem) => prevValue + curItem.price,
        0
      );
      return sum;
    }
  
    // set cartQuantity(value){
    //   this.quantityCounter = value;
    //   this.totalOutput1.innerHTML = `<h2 class="">${this.totalQuantity}</h2>`
    // }
  
    // get totalQuantity(){
    //   const sumQuantity = this.items.length;
    //   return sumQuantity;
    // }
  
    constructor(renderHookId) {
      super(renderHookId);
    }
  
    addProduct(product) {
      const updatedItems = [...this.items];
      updatedItems.push(product);
      this.cartItems = updatedItems;
    }
    //my added code
    removeProduct(product) {
      const updatedItems = [...this.items];
      if(updatedItems.includes(product)){
        updatedItems.pop(product);
        this.cartItems = updatedItems;
        alert('Deleted from cart');
      }
      else{
        // alert('Not in cart, can not be deleted');
      }
      
    }
  
    render() {
      const cartEl = this.createRootElement('section', 'cart');
      cartEl.innerHTML = `
          <h2 class="totalPr">Total Price: \$${0}</h2>
          <h2 class="pa2pa">Product in cart: <span class ="prodCount">${0}</span></h2>
          <button>Order Now!</button>
      `;
      this.totalOutput = cartEl.querySelector('.totalPr');
    }
  }
  
  class ProductItem extends CommonFunctionality {
    constructor(product, renderHookId) {
      super(renderHookId);
      this.product = product;
    }
  
    addToCart() {
      App.addProductToCart(this.product);
    }
  
    removeToCart() {
      App.removeProductToCart(this.product);
      
    }
  
    render() {
      const prodEl = this.createRootElement('li', 'product-item');
      prodEl.innerHTML = `
      <header class="header">
          <h1 class="logo"><a href="#">VISION SHOP</a></h1>
        <ul class="main-nav">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        </header> <br /><br />
          <div class = "prod-structure">
            
            <div>
              <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            </div>
          
            <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>Price: \$${this.product.price}</h3>
              <h3>Stock: ${this.product.stock}</h3>
              <p>${this.product.description}</p>
              <button class="button_1">Add to Cart</button>
              <button class ="button_2">Delete from Cart</button>
            </div>
          </div>
        `;
        
      const addCartButton = prodEl.querySelector('.button_1');
      addCartButton.addEventListener('click', this.addToCart.bind(this));
      const deleteCartButton = prodEl.querySelector('.button_2');
      deleteCartButton.addEventListener('click', this.removeToCart.bind(this));
   
    }
  }
  
  class ProductList extends CommonFunctionality {
    products = [
      new Product(
        'Jacket',
        'https://5.imimg.com/data5/KR/CV/MY-32987965/men-s-high-neck-jacket-500x500.jpg',
        'Casual Jackets Leather Men\'s High Neck Jacket, Size: Large',
        32.89, 
        45
      ),
      new Product(
        'Suit',
        'https://5.imimg.com/data5/WU/QS/RP/SELLER-3208598/three-pcs-suits-500x500.jpg',
        'Party Mens Check Designer Suit, Size: Slim Fit',
        49.99,
        78
      ),
      new Product(
        'T Shirt',
        'https://5.imimg.com/data5/FP/VZ/LU/SELLER-12823046/men-plain-polo-t-shirts-500x500.jpg',
        'Cotton & Polyrster Matty Men Plain Polo T Shirts, Size: Medium',
        28.99,
        5
      ),
      new Product(
        'Hoodie',
        'https://5.imimg.com/data5/RE/UZ/LS/SELLER-52346821/full-sleeves-man-hoodies-500x500.jpg',
        'Hooded Printed Full Sleeves Man Hoodies, Machine Wash, Size: S-xxl',
        89.99, 
        10
      )
    ];
  
    constructor(renderHookId) {
      super(renderHookId);
    }
  
    render() {
      this.createRootElement('ul', 'product-list', [
        new ElementAttribute('id', 'prod-list')
      ]);
      for (const prod of this.products) {
        const productItem = new ProductItem(prod, 'prod-list');
        productItem.render();
      }
    }
  }
  
  class Shop {
    render() {
      this.cart = new ShoppingCart('vision');
      this.cart.render();
      const productList = new ProductList('vision');
      productList.render();
    }
  }
  
  class App {
    static cart;
  
    static init() {
      const shop = new Shop();
      shop.render();
      this.cart = shop.cart;
    }
  
    static addProductToCart(product) {
      this.cart.addProduct(product);
      alert('product added to cart');
      // Implementation of addition of products
      const counterVal = document.querySelector('.prodCount');
      let counterValInt = parseInt(counterVal.innerText.trim());
      counterValInt = counterValInt + 1;
      counterVal.innerText = counterValInt;
    }
  
    static removeProductToCart(product) {
      this.cart.removeProduct(product);
      const counterVal = document.querySelector('.prodCount');
      let counterValInt = parseInt(counterVal.innerText.trim());
      if(counterValInt > 0){
        counterValInt = counterValInt - 1;
        counterVal.innerText = counterValInt;
      }
    }
  }
  
  
  App.init();
  
  
  // Implementing delete functionality
  const productsArray = document.querySelectorAll('.product-item');
  const deleteProductButton = document.querySelectorAll('.button_2');
  
  function deleteItem(buttonsClass, childClass){
    for(var i = 0; i < buttonsClass.length; i++){
  
      (function(child){
        buttonsClass[i].addEventListener('click', function(e){
          child.parentNode.removeChild(child);
        },false);
      })(childClass[i]);
    }
  }
  
  deleteItem(deleteProductButton, productsArray);
  
  