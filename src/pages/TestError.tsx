export default function TestError() {
	throw new Error("This is a test error to verify ErrorBoundary catches it!");
	return null;
}
