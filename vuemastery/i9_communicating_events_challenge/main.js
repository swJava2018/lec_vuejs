Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
                    
        <div class="product-image">
            <img v-bind:src="image">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>User is premium: {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
                >Add to Cart</button>

            <button v-on:click="removeFromCart" 
                >Remove from Cart</button>

        </div>
    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyster", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue.jpg',
                    variantQuantity: 8
                }
            ] 
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [] 
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
              if (this.cart[i] === id) {
                 this.cart.splice(i, 1);
              }
            }
        }
    }
})