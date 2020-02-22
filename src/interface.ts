// Potential improvements -
// - Can extend the mode to include 'race'
// - Can introduce other policies such as backoff (exponential or linear)

export type Extra = {
	headers?: any,
	retry?: number
}
