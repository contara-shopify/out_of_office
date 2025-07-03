document.addEventListener('alpine:init', () => { 
    Alpine.data('SkioComponent', (id) => ({
      id,
      mainProduct: {},              // { id, title, options, variants }
      variants: [],                 // [{ id, title, options: { Color: 'Red', Size: 'M' }, ... }]
      selectedVariant: null,        // Selected Variant
      skioDataObj: {},              // { id, metadata }
      typePurchase: 'subscribe',    // Default purchase type
      selectedSellingPlan: {},      // Selected selling plan object { }
      selectedSellingPlanId: null,  // Selected selling plan
      priceFormatted: '',           // Formatted price string
      priceFormattedSkio: '',       // Formatted price string for SKIO
      form_product: null,           // Reference to the product form element
      selling_plan_input: null,     // Reference to the selling plan input element
      btn_add_to_cart_price: null,  // Reference to the add to cart button
      general_price: null,  // Reference to the add to cart button
      inputQuantity: null,          // Reference to the quantity input element
      quantityProduct: 1,           // Default quantity for the product

      /**
       * Initialize the component with default data
       */
      init() {
        this.form_product = document.querySelector('.form-skio-selector');
        this.parseProductJson();            // Parse the product JSON from the DOM
        this.mapVariants();                 // Map all variants with named option objects
        this.getSkioData();                 // Get SKIO data
        this.getVariantIdFromUrl();         // Get variant ID from URL
        if (!this.selectedVariant && this.variants.length > 0) {
          this.selectedVariant = this.variants[0];
          console.log('[Skio] Fallback selectedVariant:', this.selectedVariant);
        }



        this.observeVariantBlockChanges();  // Observe changes in the variant block for dynamic updates
        this.setInitialSellingPlan();

        if (this.form_product) {
          this.selling_plan_input = this.form_product.querySelector('input[name="selling_plan"]');
          this.selling_plan_input.value = this.selectedSellingPlanId || '';
          this.btn_add_to_cart_price = this.form_product.querySelector('.product-form__submit-price');
          this.general_price = document.querySelector('.price__regular .price-item');
          // this.inputQuantity = this.form_product.querySelector('input[name="product-column__quantity"]');
          // if (this.inputQuantity) {
          //   this.inputQuantity.addEventListener('change', () => {
          //     console.log('Quantity changed:', this.inputQuantity.value);
          //     this.quantityProduct = parseInt(this.inputQuantity.value) || 1;
          //     this.checkAddToCartPrice(); // Update price on quantity change
          //   });
          // }
          this.checkAddToCartPrice(); // Initial price check
        }

        window.addEventListener('load', () => {

        });
      },
  
      /** 
       * Parse the product JSON from a DOM reference
       */
      parseProductJson() {
        const productData = JSON.parse(this.$refs.productDataJson.textContent);
        this.mainProduct = productData;
        console.log('[Skio] Parsed product data:', this.mainProduct);
      },
      
      /**
       * Render feature text with serving price
       * @param {String} text - The feature text containing [serving] placeholder
       * @return {String} - The text with [serving] replaced by formatted serving price
       * */
      renderFeatureText(text) {
        const price = this.selectedVariant?.selling_plan_allocations?.[0]?.price;
        if (!price) return text;
      
        const servingPrice = price / 30;
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(servingPrice / 100);
      
        return text.replace('[serving]', formatted);
      },

      /**
       * Get the variant ID from the URL query parameters
       * @return {Number|null} - Returns the variant ID or null if not found
       * */
      getVariantIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const variantId = params.get('variant');
        
        if (!variantId) {
          console.warn('No variant ID found in URL');
          return;
        }
      
        const parsedId = parseInt(variantId);
        if (isNaN(parsedId)) {
          console.warn('Invalid variant ID in URL');
          return;
        }
      
        const foundVariant = this.variants.find(v => v.id === parsedId);
        if (foundVariant) {
          this.selectedVariant = foundVariant;
          console.log('Selected variant from URL:', this.selectedVariant);
        } else {
          console.warn('Variant from URL not found in product');
        }
      },

      /**
       * Observe changes in the variant block to update selected variant
       * This is useful for dynamic pages where the variant might change without a full page reload
       * @param {String} selector - The CSS selector for the variant block
       * */
      observeVariantBlockChanges() {
        const target = document.querySelector('.the_double_variant_legend');
        const inputsVariants = target.querySelectorAll('.variant-image-input');
        
        inputsVariants.forEach(input => {
          input.addEventListener('change', () => {
            setTimeout(() => {
              this.getVariantIdFromUrl(); // Ensure we get the latest variant ID from URL
              this.checkAddToCartPrice(); // Update price display after variant change
            }, 200); // Delay to ensure the variant change is processed
          });
        });

        console.log(target, '[Skio] Observing changes in .the_double_variant_legend for variant updates...');
        if (!target) {
          console.warn('[Skio] .the-version__wrapper not found');
          return;
        }
      
        // const observer = new MutationObserver(() => {
        //   console.log('[Skio] DOM changed in .the_double_variant_legend — checking variant...');
        //   this.getVariantIdFromUrl();
        //   this.checkAddToCartPrice(); // Update price display after variant change
        // });
      
        // observer.observe(target, { 
        //   subtree: true,
        //   attributeFilter: ['class'],
        // });
      },

      /**
       * Check and update the add to cart button price based on selected variant and purchase type
       * This method is called whenever the selected variant or purchase type changes
       * @return {void} 
       * */
      checkAddToCartPrice() {
        if (this.typePurchase === 'one-time') {
          this.btn_add_to_cart_price.textContent = ' - ' + this.getPriceCorrectFormat(this.selectedVariant);
          this.general_price.textContent = this.getPriceCorrectFormat(this.selectedVariant);
        } else if (this.typePurchase === 'subscribe') {
          this.btn_add_to_cart_price.textContent = ' - ' + this.getDiscountedPrice();
          this.general_price.textContent = this.getDiscountedPrice();
        }
      },

      /** 
       * Get price from variant
       */
      getPriceCorrectFormat(variant) {
        if (!variant || typeof variant.price !== 'number') return '';
        return `$${(variant.price / 100 * this.quantityProduct).toFixed(2)} USD`;
      },

      /**
       * Change type purchase
      */ 
      changeTypePurchase(type) {
        this.typePurchase = type;
        if (type === 'one-time') {
          this.selling_plan_input.value = '';
        } else if (type === 'subscribe') {
          // this.setInitialSellingPlan();
          console.log('Setting selectedSellingPlanId:', this.selectedSellingPlanId);
          this.selling_plan_input.value = this.selectedSellingPlanId;
        }
        this.checkAddToCartPrice();
      },

      /**
       * Get and normalize Skio data into simplified array
       */
      getSkioData() {
        // const skioGroup = this.mainProduct.selling_plan_groups.find(group => group.app_id === "SKIO");
        const skioGroup = this.mainProduct.selling_plan_groups.find(group => group.app_id === "SKIO");

        if (!skioGroup || !Array.isArray(skioGroup.selling_plans)) {
          console.error('No valid SKIO data found');
          this.skioDataObj = { selling_plans: [] };
          return;
        }

        this.skioDataObj = {
          selling_plans: skioGroup.selling_plans.map(plan => {
            const adjustment = plan.price_adjustments?.[0] || {};
            return {
              id: plan.id,
              name: plan.name,
              discount: adjustment.value || 0,
              discount_type: adjustment.value_type || '',
            };
          })
        };

        console.log('Normalized skioDataObj:', this.skioDataObj);
      },
  
      /**
       * Create a normalized list of variants with key-value pair options
       */
      mapVariants() {
        this.variants = this.mainProduct.variants.map(variant => {
          const optionsObj = {};

          this.mainProduct.options.forEach((opt, i) => {
            const key = `option${i + 1}`;
            optionsObj[key] = variant.options[i];
          }); 
          return { 
            ...variant,
          };
        });
        console.log('this.variants.SKIO', this.variants); 
      },

      /**
       * Set the default selling plan when component is initialized
       */
      setInitialSellingPlan() {
        if (
          this.skioDataObj &&
          Array.isArray(this.skioDataObj.selling_plans) &&
          this.skioDataObj.selling_plans.length > 0
        ) {
          this.selectedSellingPlan = this.skioDataObj.selling_plans[0];
          this.selectedSellingPlanId = this.selectedSellingPlan.id;
          // this.selling_plan_input.value = this.selectedSellingPlanId || '';
        }
      },

      /**
       * Called when user selects a selling plan from dropdown
       */
      onChangeSellingPlan(event) {
        const selectedId = parseInt(event.target.value);
        this.selectedSellingPlanId = selectedId;
        this.selectedSellingPlan = this.skioDataObj.selling_plans.find(p => p.id === selectedId) || {};
        this.selling_plan_input.value = this.selectedSellingPlanId || '';
        console.log('Selected selling plan:', this.selectedSellingPlan);
      },

      /**
       * Get formatted discounted price based on selected plan
       */
      getDiscountedPrice() {
        if (!this.selectedVariant || !this.selectedSellingPlan) return '';
    
        const { discount, discount_type } = this.selectedSellingPlan;
        if (discount_type !== 'percentage') return this.getPriceCorrectFormat(this.selectedVariant);
      
        const discountValue = (this.selectedVariant.price * discount) / 100;
        const discounted = this.selectedVariant.price - discountValue;
      
        return `$${(discounted / 100 * this.quantityProduct).toFixed(2)} USD`;
      },

      /**
       * Get discount difference as formatted amount
       */
      getPriceDifference() {
        if (!this.selectedVariant || !this.selectedSellingPlan) return '';
      
        const { discount, discount_type } = this.selectedSellingPlan;
        if (discount_type !== 'percentage') return '';
      
        const diff = (this.selectedVariant.price * discount) / 100;
        return `$${(diff / 100).toFixed(2)} USD`;
      },
    }));
  });