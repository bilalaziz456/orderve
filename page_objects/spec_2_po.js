
module.exports = {

    toElement: {
        filter: $("#layered-filter-block-container"),
        products_list: $$("[class='gridCard product-list-view'] a[class='product-item-link']"),
        add_card_count: element(by.xpath("//*[@id='top']/div[1]/div[2]/a/span[2]/span[1]")),
        add_button: $("#product-addtocart-button"),
        success_msg: $("[class='message-success success message'] div"),
        mini_cart_active: $("[class='action showcart active']"),
        view_cart: $("#minicart-content-wrapper a[class='action viewcart']"),
        plus_icon: $(".cart-item-list [class='quantity-button quantity-up']"),
        update: $(".cart-item-list [class='col action tocart update-cart ']"),
        goto_checkout: $(".cart-payment-container [title='Go to Checkout']"),
        checkout_as_guest: $(".option-guest a"),
        search_btn: element(by.xpath("//button[@class='btn  heroInputButton algolia-custom-search']")),

        //guest data fill up 
        guest_email: $("#customer-email-fieldset input"),
        guest_fname: $("[name='shippingAddress.firstname'] input"),
        guest_lname: $("[name='shippingAddress.lastname'] input"),
        guest_address: $("[name='shippingAddress.street.0'] input"),
        guest_city: $("[name='shippingAddress.city'] input"),
        guest_phone_no: $("[name='shippingAddress.telephone'] input"),
        guest_state: $("[name='region_id']"),
        guest_zipcode: $("[name='shippingAddress.postcode'] input"),
        payment_review: $("#shipping-method-submit"),

        guest_payment_title: $("#checkout-payment-method-load .step-title"),
        guest_card_number: $("input[name='cardnumber']"),
        guest_card_expr_date: $("input[name='exp-date']"),
        guest_card_cvv_no: $("input[name='cvc']"),
        guest_place_order: $("#place-order-trigger"),
        order_success_msg: element(by.xpath("//*[@class='order-placed-note text-left']//h6"))
    },

    clickOnProduct: (product_name) => {
        element(by.xpath("//a[@class='product-item-link' and normalize-space()='" + product_name + "']")).click()
    }
}