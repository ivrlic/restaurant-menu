import {menuArray} from "./data.js"

const foodList = document.getElementById("order-list")
const theOrder = document.getElementById("the-order")
const modal = document.getElementById("modal")
const endOrder = document.getElementById("end-order")
const inputName = document.getElementById("input-name")
let newFoodArray = []


// GETTING THE FOOD LIST
function getFoodList() {
    let itemHtml=""
    
    menuArray.forEach(function(item){
        itemHtml += `
        <div class="item" id="item">
        <img class="item-img" src="images/${item.img}" alt="An icon of ${item.name}">
            <div class="item-description">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                <p class="item-price">$${item.price}</p> 
                </div>
                <button class="add-item-btn" id="${item.id}" data-add="${item.id}">+</button>
                </div>
                `
            })
            return itemHtml 
        }
        
        
function renderFoodList() {
    foodList.innerHTML = getFoodList()
    }

renderFoodList()


document.addEventListener("click", function(e){
    // add button
    if(e.target.dataset.add){
        getNewFoodArray(e.target.id)
    // remove btn
    } else if (e.target.dataset.remove){
        removeFoodFromNewArray(e.target.dataset.remove)
    // end order btn
    } else if (e.target.id==="the-order-btn") {
        modal.style.display="block"
    // paying modal close button
    } else if (e.target.id==="modal-close-btn") {
        modal.style.display="none" 
    } 
})

// pay button
document.getElementById("consent-form").addEventListener("submit", function(e){
    e.preventDefault()
    modal.style.display="none"
    theOrder.style.display="none"
    endOrder.style.display="block"
    endOrder.innerHTML = `<p class="end-order-text">Thanks, ${inputName.value}! Your order is on its way!</p>
    `
    newFoodArray = []
})



// ORDERING ONE FOOD
function getNewFoodArray(itemId){
 
    const newFood = menuArray.filter(function(food){
        return food.id === Number(itemId)
    })[0]

    if (newFoodArray.includes(newFood)) {

    } else {
        newFoodArray.push(newFood)
    }
    orderNewFoodHtml(newFoodArray)
    
    theOrder.style.display="block"
    endOrder.style.display="none"
    
}



// REMOVING ONE FOOD FROM THE ORDER
function removeFoodFromNewArray(removeData) {
    const newFood = newFoodArray.filter(function(food){
        return food.id !== Number(removeData)
    })
    newFoodArray = newFood
    orderNewFoodHtml(newFoodArray)

    if(newFoodArray.length===0){
        theOrder.style.display="none"
    }

}

function orderNewFoodHtml(newFoodArray){
        let newFoodHtml = ""
        let totalPrice = 0
        newFoodArray.forEach(function(food){
        totalPrice += food.price
            newFoodHtml += `
            <div class="the-order-item" id="the-order-item">
                <p class="the-order-item-name">${food.name}</p>
                <button class="the-order-item-remove-btn" data-remove="${food.id}">remove</button>
                <p class="the-order-item-price">$${food.price}</p>
            </div>
        `
    })  
    renderOrderNewFood(newFoodHtml, totalPrice)   
}



// RENDERING THE ORDER
function renderOrderNewFood(newFoodHtml, totalPrice){
    theOrder.innerHTML = `
    <p class="the-order-title">Your order</p>
    <div class="the-order-list" id="the-order-list">
        ${newFoodHtml}
    </div>
    <div class="the-order-total-price">
        <p class="the-order-total-price-name">Total price:</p>
        <p class="the-order-total-price-amount">$${totalPrice}</p>
    </div>
    <div class="the-order-btn-div">
        <button class="the-order-btn" id="the-order-btn">Complete order</button>
    </div>
    `
}

