# from flask import Flask, redirect, request
# import stripe

# YOUR_DOMAIN = 'http://localhost:5000'
# stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
# endpoint_secret = os.environ.get('ENDPOINT_SECRET')

# @app.route('/create-checkout-session', methods=['POST'])
# def create_checkout_session(id):
#     try:
#         sneaker_to_purchase_Id= CartSneaker.query.get(sneaker_id)
#         sneaker_price = Sneaker.get(sneaker_to_purchase_Id)

#         checkout_session = stripe.checkout.Session.create(
#             line_items=[
#                 {
#                     'price': sneaker_to_purchase.stripe_price_id,
#                     'quantity': 1
#                 }
#             ],
#             mode='payment',
#             success_url=YOUR_DOMAIN + "/loading",
#             cancel_url=YOUR_DOMAIN + "/loading"
#         )
#     except Exception as e:
#         return str(e)
#     return redirect(checkout_session.url, code=303)

# @app.route('/webhook', methods=['POST'])
# def webhook():
#     event = None
#     payload = request.get_data()
#     sig_header = request.headers.get('Stripe_Signature')

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, endpoint_secret
#         )
#     except ValueError as e:
#         raise e
#     except stripe.error.SignatureVerificationError as e:
#         raise e

#     if event['type'] == 'checkout.session.completed':
#         checkout_session = event['data']['object']
#         data_for_db = Transaction()
#         data_for_db.buyer_id = checkout_session.client_reference_id
#         data_for_db.sneaker_id = checkout_session.line_items.price.product
#         if checkout_session.payment_status == 'paid':
#             data_for_db.amount_paid = checkout_session.amount_total
#         db.session.add(data_for_db)
#         db.session.commit()
#     else:
#         print('Unhandled event type {}'.format(event['type']))

#     return make_response(success=True)

# @app.route('/')
# def index():
#     return '<h1>ShoeHaven</h1>'