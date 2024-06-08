const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User } = require("./../models/people");
const catchAsync = require("./../utils/catchasync");
const { Cart } = require("../models/cart");
const Profile = require("./../models/profile");
const Purchase = require("./../models/purchaseItems");
const factory = require("./handlerFactory");
const Email = require("./../utils/email");
const _ = require("lodash");

// module.exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   const userId = req.user.id;

//   const Items = await Cart.find({ user: userId });

//   //Product Name
//   const allProductName = Items.map((item) => {
//     return item.product.name;
//   });

//   //Product Id
//   const allProductId = Items.map((item) => {
//     return item.product._id;
//   });
//   const total_amount = Items.map((item) => item.count * item.price).reduce(
//     (a, b) => a + b,
//     0
//   );

//   //Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],

//     success_url: `http://localhost:3000/success`,
//     cancel_url: `http://localhost:3000/canceled`,
//     mode: "payment",
//     //Client code added
//     // Adding the shipping prices
//     shipping_address_collection: {
//       allowed_countries: ["US", "CA"],
//     },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: 900,
//             currency: "usd",
//           },
//           display_name: "Regular shipping",
//           // Delivers between 5-7 business days
//           delivery_estimate: {
//             minimum: {
//               unit: "business_day",
//               value: 5,
//             },
//             maximum: {
//               unit: "business_day",
//               value: 7,
//             },
//           },
//         },
//       },
//     ],
//     // allow_promotion_codes: true,
//     //client code end
//     customer_email: req.user.email,
//     client_reference_id: allProductId.join(" "),

//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: allProductName.join(" "),
//             images: [
//               `${req.protocol}://${req.get("host")}/img/products/${
//                 Items[0].product.photo
//               }`,
//             ],
//           },
//           unit_amount: total_amount * 100,
//         },
//         quantity: 1,
//         //tax_rates: [process.env.TAX_ID]
//       },
//     ],
//   });
//   //For Globally use
//   global.allProduct = session.client_reference_id;
//   global.userEmail = session.customer_email;
//   global.client_reference_id = session.client_reference_id;
//   global.amount =
//     (session.amount_total - session.total_details.amount_shipping) / 100 +
//     session.total_details.amount_shipping / 100;

//   res.status(200).json({
//     status: "success",
//     session,
//   });
// });
module.exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const userId = req.body.id;
  console.log(JSON.stringify(req.body));

  if (userId) {
    const Items = await Cart.find({ user: userId });
    //Product Name
    const allProductName = Items.map((item) => {
      return item.product.name;
    });
    //Product Id
    const allProductId = Items.map((item) => {
      return item.product._id;
    });
    const total_amount = Items.map((item) => item.count * item.price).reduce(
      (a, b) => a + b,
      0
    );

    //Create checkout session
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],

    //   success_url: `http://localhost:3000/success`,
    //   cancel_url: `http://localhost:3000/canceled`,
    //   mode: "payment",
    //   //Client code added
    //   // Adding the shipping prices
    //   shipping_address_collection: {
    //     allowed_countries: ["US", "CA"],
    //   },
    //   shipping_options: [
    //     {
    //       shipping_rate_data: {
    //         type: "fixed_amount",
    //         fixed_amount: {
    //           amount: 900,
    //           currency: "usd",
    //         },
    //         display_name: "Regular shipping",
    //         // Delivers between 5-7 business days
    //         delivery_estimate: {
    //           minimum: {
    //             unit: "business_day",
    //             value: 5,
    //           },
    //           maximum: {
    //             unit: "business_day",
    //             value: 7,
    //           },
    //         },
    //       },
    //     },
    //   ],
    //   allow_promotion_codes: true,
    //   //client code end
    //   customer_email: req.body.email,
    //   client_reference_id: allProductId.join(" "),

    //   line_items: Items.map((item) => {
    //     return {
    //       price_data: {
    //         currency: "usd",
    //         product_data: {
    //           name: item.product.name,
    //         },

    //         unit_amount: item.product.price * 100,
    //       },
    //       description: item.product.description,
    //       quantity: item.count,
    //       //tax_rates: [process.env.TAX_ID],
    //     };
    //   }),
    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/canceled",
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 900,
              currency: "usd",
            },
            display_name: "Regular shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      allow_promotion_codes: true,
      customer_email: req.body.email,
      client_reference_id: allProductId.join(" "),
      line_items: Items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.count,
        };
      }),
    });

    //For Globally use

    global.allProduct = session.client_reference_id;
    global.userEmail = session.customer_email;
    global.client_reference_id = session.client_reference_id;
    global.amount =
      (session.amount_total - session.total_details.amount_shipping) / 100 +
      session.total_details.amount_shipping / 100;

    return res.status(200).json({
      status: "success",
      session,
    });
  } else {
    //Create checkout session

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/canceled`,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      allow_promotion_codes: true,
      customer_email: req.body.email,
      line_items: req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
    });

    global.userEmail = session.customer_email;
    global.amount =
      (session.amount_total - session.total_details.amount_shipping) / 100 +
      session.total_details.amount_shipping / 100;

    return res.status(200).json({
      status: "success",
      session,
    });
  }
});

const createPurchaseCheckout = async (session) => {
  try {
    //Customer profile set
    const user_Id = (await User.findOne({ email: global.userEmail }))._id;

    if (!user_Id || user_Id === "undefined") {
      let user = {
        name: "john Dohh",
        email: global.userEmail,
      };
      await new Email(user, "").sendPurchaseEmail();
      return;
    }
    const userProfile = _.pick(session.shipping.address, [
      "line1",
      "line2",
      "city",
      "state",
      "postal_code",
      "country",
    ]);
    userProfile["user"] = user_Id;
    let profile = await Profile.findOne({ user: user_Id });
    if (profile) {
      await Profile.updateOne({ user: user_Id }, userProfile);
    } else {
      profile = new Profile(userProfile);
      await profile.save();
    }
    //Customer profile set

    const productStr = global.client_reference_id;
    const product = productStr.split(" ");
    // const user = (await User.findOne({ email: session.customer_email })).id;
    const user = await User.findOne({ email: global.userEmail });
    const userId = user._id;
    // const price = session.line_items[0].amount / 100;
    const price = global.amount;
    await Purchase.create({ product, user: userId, price });
    await Cart.deleteMany({ user: userId });

    //3) Send it to user's email
    await new Email(user, "").sendPurchaseEmail();
  } catch (err) {}
};

module.exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    createPurchaseCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

module.exports.createPurchase = factory.createOne(Purchase);
module.exports.getAllPurchase = factory.getAll(Purchase);
module.exports.updatePurchase = factory.updateOne(Purchase);
module.exports.deletePurchase = factory.deleteOne(Purchase);

module.exports.userPurchaseProduct = catchAsync(async function (
  req,
  res,
  next
) {
  let document = await Purchase.find({ user: req.params.id });

  if (!document) {
    return next(new AppError("No Document found with that Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc: document,
    },
  });
});
