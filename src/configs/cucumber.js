module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/e2e/features/"
        ],
        publishQuiet: true,
        dryRun: false,
        require: [
            "src/e2e/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:results/cucumber-report.html",
            "json:results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2,
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        publishQuiet: true,
        dryRun: false,
        require: [
            "src/e2e/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:results/cucumber-report.html",
            "json:results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2,
    }
}