const previousSceneMiddleware = (ctx, next) => {
    // get the current scene
    const currentScene = ctx.scene.current;

    // if there is a previous scene, save it to the session
    if (currentScene && currentScene.previousScene) {
        ctx.session.previousScene = currentScene.previousScene;
    }

    // continue the middleware chain
    return next();
}

module.exports = {previousSceneMiddleware}
