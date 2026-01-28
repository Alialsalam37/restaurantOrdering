import { menuArray } from '/data.js'

const content = document.getElementById("content")

const priceArr = []

document.addEventListener('click', function (e) {
    if (e.target.dataset.add) {
        handelAddClick(e.target.dataset.add)
        document.getElementById('footerDiv').style.display = 'block'
    }
    else if (e.target.dataset.remove) {
        handelRemoveClick(e.target.dataset.remove)
    }
    else if (e.target.id === "completeBtn") {
        document.getElementById('cardDetails').style.display = 'block'
    }
    else if (e.target.id === "payBtn") {
        e.preventDefault()
        document.getElementById('footerDiv').style.display = 'none'
        document.getElementById('cardDetails').style.display = 'none'
        document.getElementById("finishOrder").style.display = 'block'

    }

})

function handelAddClick(mealId) {
    const targetMeal = menuArray.filter(meal => meal.id === Number(mealId))[0]
    renderAddClick(targetMeal)
}
function renderAddClick(meal) {
    priceArr.push(meal.price)
    document.getElementById("renderOrder").innerHTML += `
    <div class="order" id="${meal.id}">
        <h6 class="orderName">${meal.name}</h6>
        <button class="removeBtn" id="removeBtn" data-remove=${meal.id}>remove</button>
        <h6 class="orderPrice">$${meal.price}</h6>
    </div>
    `
    document.getElementById("orderPrice").textContent = `$${priceArr.reduce((total, first) => total + first, 0)}`
}

function handelRemoveClick(mealId) {
    document.getElementById(mealId).remove()

    const targetMealRemove = menuArray.filter(remove => remove.id === Number(mealId))[0]
    const removePrice = targetMealRemove.price

    priceArr.splice(priceArr.indexOf(removePrice), 1)

    document.getElementById("orderPrice").textContent = `$${priceArr.reduce((total, first) => total + first, 0)}`

}

function getMenuRender() {
    const menuHTML = menuArray.map(item => {
        return `
        <div class="container">
                    <h1>${item.emoji}</h1>
                    <div class="info">
                        <h2>${item.name}</h2>
                        <p class="pinfo">${item.ingredients.join(',')}</p>
                        <h4>$${item.price}</h4>
                    </div>
                    <button class="addBtn" id="addBtn" data-add=${item.id}>+</button>
                </div>
    `
    }).join('')
    return menuHTML
}
content.innerHTML = getMenuRender()