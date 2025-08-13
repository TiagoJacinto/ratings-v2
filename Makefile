.PHONY: test-openapi

test-openapi:
	schemathesis run ./packages/contract/tsp-output/schema/openapi.1.0.yaml --url http://localhost:8080