const cds = require("@sap/cds");
const logger = cds.log("SAPCAP TEST : ");

module.exports = cds.service.impl(function () {
  // console.log("Am inside banana implementation");
  // this.on("READ", "Orders", (_, next) => {
  //   return next();
  // });

  const addUrgencyFlag = async (orders) => {
    if (Array.isArray(orders)) {
      const orderIds = orders.map((order) => order.ID);

      const itemsWithHighQuantity = await cds.run(
        SELECT.from("OrderItems")
          .columns(["parent_ID", "quantity"])
          .where({ parent_ID: { in: orderIds }, quantity: { ">": 15 } })
      );

      logger(itemsWithHighQuantity);

      orders.forEach((order) => {
        order.urgency = itemsWithHighQuantity.some(
          (item) => item.parent_ID === order.ID
        );
      });
    }
  };

  // this.after("each", "Orders", (data) => logger(data));
  this.after("READ", "Orders", (data, _) => addUrgencyFlag(data, _));
});
