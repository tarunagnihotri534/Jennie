# QA Features & Automated Testing

Jennie includes automated QA capabilities that run dynamic check suites, verify test coverage, and catch subtle edge-case regressions.

## Key Capabilities

- **Regression Detection**: Analyzes call trees to find unintended side effects in untested modules.
- **Coverage Auditing**: Warns when new exported utility functions lack corresponding unit test cases.
- **Mock Verification**: Ensures API integration tests mock third-party network requests properly.
