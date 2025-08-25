type Stat = {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
};

class Stats {
  protected health: number;
  protected maxHealth: number;
  protected attack: number;
  protected defense: number;
  protected speed: number;
  // readonly stamina: number;

  constructor({ health, maxHealth, attack, defense, speed }: Stat) {
    /* constructor is only for => validation + assignment */

    // check if values are not negative
    if (health < 0 || maxHealth < 0 || attack < 0 || defense < 0 || speed < 0) {
      throw new Error("Stats cannot be negative!");
    }

    // health has to be less than or equal to maxHealth
    if (health > maxHealth) throw new Error("");

    this.health = health;
    this.maxHealth = maxHealth;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
  }

  // apply damage
  public damage({ amount = 0 }): void {
    const res = this.health - amount;

    // check if health > 0
    if (res < 0) throw new Error("damage makes health < 0");

    // immutable
    this.cloneWith({ health: res });
  }

  public heal({ amount = 0 }): Stats {
    const res = this.maxHealth + amount;

    if (res > this.maxHealth) throw new Error("heal makes health > maxHealth");

    //immutable
    return this.cloneWith({ health: res });
  }

  // immutable
  private cloneWith({
    health = 0,
    maxHealth = 0,
    attack = 0,
    defense = 0,
    speed = 0,
  }: {
    health?: number;
    maxHealth?: number;
    attack?: number;
    defense?: number;
    speed?: number;
  }): Stats {
    return new Stats({
      health: health ?? this.health,
      maxHealth: maxHealth ?? this.maxHealth,
      attack: attack ?? this.attack,
      defense: defense ?? this.defense,
      speed: speed ?? this.speed,
    });
  }

  // static factory method
  public static create({ health, maxHealth, attack, defense, speed }: Stat) {
    // check if values are not negative
    if (maxHealth < 0 || attack < 0 || defense < 0 || speed < 0) {
      throw new Error("Stats cannot be negative!");
    }

    // health has to be less than or equal to maxHealth
    if (health >= 0 && health <= maxHealth)
      throw new Error("Health has to be between: 0 to maxHealth");

    // create instance
    const stats = new Stats({
      health: health,
      maxHealth: maxHealth,
      attack: attack,
      defense: defense,
      speed: speed,
    });

    return stats;
  }

  // utilities methods

  // comparing two objects -> by value
  public equals(other: Stats): boolean {
    return (
      this.health === other.health &&
      this.maxHealth === other.maxHealth &&
      this.attack === other.attack &&
      this.defense === other.defense &&
      this.speed === other.speed
    );
  }

  // Stats object -> ready for serialize to JSON
  public toPrimitives(): Stat {
    /* Get a plain JS object from the Stats instance => basically an object with only ->instance variables*/
    return {
      health: this.health,
      maxHealth: this.maxHealth,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
    };
  }

  // from JSON to Stats object
  public static fromPrimitives({
    health,
    maxHealth,
    attack,
    defense,
    speed,
  }: Stat): Stats {
    // check if values are not negative
    if (maxHealth < 0 || attack < 0 || defense < 0 || speed < 0) {
      throw new Error("Stats cannot be negative!");
    }

    // health has to be less than or equal to maxHealth
    if (health >= 0 && health <= maxHealth)
      throw new Error("Health has to be between: 0 to maxHealth");

    // create a full Stats object
    return new Stats({ health, maxHealth, attack, defense, speed });
  }
}

export default Stats;
