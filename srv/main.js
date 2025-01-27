const cds = require("@sap/cds");
const { where } = require("@sap/cds/lib/ql/cds-ql");
const { Books } = cds.entities("bookshop");

module.exports = cds.service.impl(function () {
  this.on("totalStockCount", async () => {
    // return await SELECT .from(cds.entities["Books"]);
    const total = await SELECT.columns("sum(stockCount) as finalCount").from(
      Books
    );
    return total[0].finalCount;
  });

  this.on("getStockPrice", Books, async ({ params: [id] }) => {
    const result = await SELECT.columns(
      "stockCount * price as StockPrice"
    ).one.from(Books).where`ID = ${id}`;

    return result.StockPrice;
  });

  this.on("setPrice", Books, async (req) => {
    const id = req.params[0];
    await UPDATE(Books, id).with({
      price: req.data.price,
    });

    return await SELECT(Books, id);
  });
});
