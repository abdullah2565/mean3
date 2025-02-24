
function checkDeliveryRestrictions() {
    function delivery() {
      const currentDate = new Date();
      let hours24 = currentDate.getHours(); 
      let disableCart = false; 
      let showDeliveryDiv = false; 
  
      document.querySelectorAll(".cart__form-item").forEach(item => {
        const productData = item.getAttribute("data-json-product"); 
  
        if (productData) {
          let shouldDisable = false; 
  
   
          if (productData.includes("2hr-delivery")) {
            showDeliveryDiv = true; 
            if (hours24 >= 15) {
              shouldDisable = true;
            }
          }
  
        
          if (productData.includes("sameday")) {
            showDeliveryDiv = true; 
            if (hours24 >= 13) {
              shouldDisable = true;
            }
          }
  
          if (shouldDisable) {
            disableCart = true; 
            item.classList.add("remove-div");
            item.style.backgroundColor = "red";
  
            if (!item.querySelector(".delivery-msg")) {
              let msg = document.createElement("p");
              msg.textContent = "Delivery is not available at this time.";
              msg.classList.add("delivery-msg");
              msg.style.color = "white";
              msg.style.fontWeight = "bold";
              msg.style.padding = "10px";
              item.appendChild(msg);
            }
          } else {
            item.classList.remove("remove-div");
            item.style.backgroundColor = "";
  
            let existingMsg = item.querySelector(".delivery-msg");
            if (existingMsg) {
              existingMsg.remove();
            }
          }
        }
      });
  
   
      let cartSubmitBtn = document.querySelector(".cart__submit");
      if (cartSubmitBtn) {
        if (disableCart) {
          cartSubmitBtn.disabled = true;
          cartSubmitBtn.style.opacity = "0.5";
          cartSubmitBtn.style.cursor = "not-allowed";
        } else {
          cartSubmitBtn.disabled = false;
          cartSubmitBtn.style.opacity = "1";
          cartSubmitBtn.style.cursor = "pointer";
        }
      }
  
  
      let deliveryInfoDiv = document.querySelector(".delivery-info");
      if (deliveryInfoDiv) {
        if (showDeliveryDiv) {
          deliveryInfoDiv.style.display = "block";
        } else {
          deliveryInfoDiv.style.display = "none";
        }
      }
    }
  
    function observeCartChanges() {
      const cartContainer = document.querySelector(".cart__form");
      if (cartContainer) {
        const observer = new MutationObserver(() => {
          delivery(); 
        });
  
        observer.observe(cartContainer, { childList: true, subtree: true });
      }
    }
  
    delivery();
    observeCartChanges();
  }
  
  checkDeliveryRestrictions();
  