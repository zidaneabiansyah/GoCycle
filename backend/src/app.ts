import express from "express";
import applyCors from "./middlewares/cors.middleware";
import logger from "./infrastructure/logging/logger";
import morgan from "morgan";

import storeRoute from "./interfaces/http/express/routes/store.route";
import productRoute from "./interfaces/http/express/routes/product.route";
import subCategoryRoute from "./interfaces/http/express/routes/sub-category.route";
import showcaseRoute from "./interfaces/http/express/routes/showcase.route";
import diyRoute from "./interfaces/http/express/routes/diy.route";
import impactRoute from "./interfaces/http/express/routes/impact.route";
import journeyRoute from "./interfaces/http/express/routes/journey.route";
import makersRoute from "./interfaces/http/express/routes/makers.route";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(applyCors);

morgan.token("date", (req, res, tz) => {
    return new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: false
    });
});

const morganFormat =
    ':remote-addr - - [:date[Asia/Jakarta] +0700] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message: string) => logger.info(message.trim()),
        },
    })
);

app.use("/api/stores", storeRoute);
app.use("/api/products", productRoute);
app.use("/api/sub-categories", subCategoryRoute);

// New showcase endpoints
app.use("/api/showcase", showcaseRoute);
app.use("/api/diy", diyRoute);
app.use("/api/impact", impactRoute);
app.use("/api/journey", journeyRoute);
app.use("/api/makers", makersRoute);

app.get("/status", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: 'Server is healthy',
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

export default app;
