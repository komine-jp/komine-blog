"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
require("reflect-metadata");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
const compression = require("compression");
const PORT = process.env.APP_PORT || 3000;
const PREFIX = 'api';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix(PREFIX);
    app.set('trust proxy', 1);
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 60 * 1000,
        max: 100,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('博客接口')
        .setDescription('博客接口Api文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(PREFIX, app, document);
    await app.listen(PORT, () => {
        common_1.Logger.log(`服务已经启动,接口请访问:http://localhost:${PORT}/${PREFIX}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map