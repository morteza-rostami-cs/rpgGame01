interface IRngPort {
  // returns a float in [1, 0] range
  nextFloat(): number;

  // return an integer in [min, max] range
  nextInt(min: number, max: number): number;

  // returns true with probability p (0 <= p <= 1)
  chance(p: number): boolean;
}
