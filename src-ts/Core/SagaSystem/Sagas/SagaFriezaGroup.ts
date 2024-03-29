import { Saga } from "./BaseSaga";
import { Players } from "Libs/TreeLib/Structs/Players";
import { SagaHelper } from "../SagaHelper";
import { AdvancedSaga } from "./AdvancedSaga";
import { CreepManager } from "Core/CreepSystem/CreepManager";
import { SagaUpgradeNames, Creep } from "Core/CreepSystem/CreepUpgradeConfig";

export class NamekSaga extends AdvancedSaga implements Saga {
  name: string = '[DBZ] Namek Saga: Zarbon and Dodoria';

  constructor() {
    super();
    this.sagaDelay = 40;
    this.stats = 50;
  }

  spawnSagaUnits(): void {
    super.spawnSagaUnits();
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 15, "Zarbon and Dodoria have arrived looking for the Dragon Balls.");

    // create unit
    const maxFriezaHenchmen = 3;
    for (let i = 0; i < maxFriezaHenchmen; ++i) {
      let offsetX = Math.random() * 1500;
      let offsetY = Math.random() * 1500;
      const sagaCreep = CreateUnit(Players.NEUTRAL_HOSTILE, Creep.FriezaOrlen, 8765 + offsetX, 1400 + offsetY, Math.random() * 360);
    }

    this.addHeroListToSaga(["Dodoria", "Zarbon", "Zarbon 2"], true);

    
    const zarbon2 = this.bosses.get("Zarbon 2");
    if (zarbon2) {
      SetUnitInvulnerable(zarbon2, true);
      PauseUnit(zarbon2, true);
      ShowUnitHide(zarbon2);
    }
    
    this.ping()
    this.addActionRewardStats(this);
  }

  update(t: number): void {
    // if zarbon dead, replace with stornger zarbon
    const zarbon = this.bosses.get("Zarbon");
    const zarbon2 = this.bosses.get("Zarbon 2");
    if (zarbon && zarbon2) {
      if (
        BlzIsUnitInvulnerable(zarbon2) &&
        (
          IsUnitDeadBJ(zarbon) || 
          GetUnitState(zarbon, UNIT_STATE_LIFE) < GetUnitState(zarbon, UNIT_STATE_MAX_LIFE) * 0.5
        )
      ) {
        DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 15, "Zarbon: Pitiful humans!");

        SetUnitX(zarbon2, GetUnitX(zarbon));
        SetUnitY(zarbon2, GetUnitY(zarbon));
        SetUnitInvulnerable(zarbon2, false);
        PauseUnit(zarbon2, false);
        ShowUnitShow(zarbon2);

        this.ping()

        KillUnit(zarbon);
      }
    }
  }

  canStart(): boolean {
    return true;
  }

  canComplete(): boolean {
    if (this.bosses.size > 0) {
      return SagaHelper.areAllBossesDead(this.bosses);
    }
    return false;
  }

  start(): void {
    super.start();
    this.spawnWhenDelayFinished();
  }

  spawnWhenDelayFinished(): void {
    if (this.sagaDelay <= 0) {
      this.spawnSagaUnits();
    } else {
      TimerStart(this.sagaDelayTimer, this.sagaDelay, false, ()=> {
        this.spawnSagaUnits();
        DestroyTimer(GetExpiredTimer());
      });
    }
  }

  complete(): void {
    super.complete();
  }
}

export class GinyuSaga extends AdvancedSaga implements Saga {
  name: string = '[DBZ] Ginyu Force Saga';

  constructor() {
    super();
    this.sagaDelay = 20;
    this.stats = 100;
  }

  spawnSagaUnits(): void {
    super.spawnSagaUnits();
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 15, "The Ginyu Force have arrived looking for the Dragon Balls.");

    // create unit
    const maxFriezaHenchmen = 5;
    for (let i = 0; i < maxFriezaHenchmen; ++i) {
      let offsetX = Math.random() * 1500;
      let offsetY = Math.random() * 1500;
      const sagaCreep = CreateUnit(Players.NEUTRAL_HOSTILE, Creep.FriezaNabana, 8765 + offsetX, 1400 + offsetY, Math.random() * 360);
    }

    this.addHeroListToSaga(["Guldo", "Recoome", "Burter", "Jeice", "Ginyu"], true);
    
    this.ping()
    this.addActionRewardStats(this);
  }

  update(t: number): void {
  }

  canStart(): boolean {
    return true;
  }

  canComplete(): boolean {
    if (this.bosses.size > 0) {
      return SagaHelper.areAllBossesDead(this.bosses);
    }
    return false;
  }

  start(): void {
    super.start();
    this.spawnWhenDelayFinished();
  }

  spawnWhenDelayFinished(): void {
    if (this.sagaDelay <= 0) {
      this.spawnSagaUnits();
    } else {
      TimerStart(this.sagaDelayTimer, this.sagaDelay, false, ()=> {
        this.spawnSagaUnits();
        DestroyTimer(GetExpiredTimer());
      });
    }
  }

  complete(): void {
    super.complete();
  }
}

export class FriezaSaga extends AdvancedSaga implements Saga {
  name: string = '[DBZ] Frieza Saga';

  constructor() {
    super();
    this.sagaDelay = 40;
    this.stats = 100;
  }

  spawnSagaUnits(): void {
    super.spawnSagaUnits();
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 15, "Frieza has arrived looking for the Dragon Balls.");

    // create unit
    const maxFriezaHenchmen = 8;
    for (let i = 0; i < maxFriezaHenchmen; ++i) {
      let offsetX = Math.random() * 2000;
      let offsetY = Math.random() * 2000;
      const sagaCreep = CreateUnit(Players.NEUTRAL_HOSTILE, Creep.FriezaAppule, 8765 + offsetX, 1400 + offsetY, Math.random() * 360);
    }

    this.addHeroListToSaga(["Frieza 1", "Frieza 2", "Frieza 3", "Frieza 4", "Frieza 5"], true);

    for (let i = 2; i <= 5; ++i) {
      const frieza = this.bosses.get("Frieza " + i);
      if (frieza) {
        SetUnitInvulnerable(frieza, true);
        PauseUnit(frieza, true);
        ShowUnitHide(frieza);
      }
    }
    
    this.ping()
    this.addActionRewardStats(this);
  }

  update(t: number): void {
    // if frieza dead, replace with strong frieza
    for (let i = 1; i < 5; ++i) {
      const frieza = this.bosses.get("Frieza " + i);
      const nextFrieza = this.bosses.get("Frieza " + (i+1));
      if (frieza && nextFrieza) {
        if (
          BlzIsUnitInvulnerable(nextFrieza) &&
          (
            IsUnitDeadBJ(frieza) || 
            GetUnitState(frieza, UNIT_STATE_LIFE) < GetUnitState(frieza, UNIT_STATE_MAX_LIFE) * 0.4
          )
        ) {
          DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 15, "Frieza: This isn't even my final form!");

          SetUnitX(nextFrieza, GetUnitX(frieza));
          SetUnitY(nextFrieza, GetUnitY(frieza));
          SetUnitInvulnerable(nextFrieza, false);
          PauseUnit(nextFrieza, false);
          ShowUnitShow(nextFrieza);

          KillUnit(frieza);
          
          this.ping()
        }
      }
    }
  }

  canStart(): boolean {
    return true;
  }

  canComplete(): boolean {
    if (this.bosses.size > 0) {
      return SagaHelper.areAllBossesDead(this.bosses);
    }
    return false;
  }

  start(): void {
    super.start();
    this.spawnWhenDelayFinished();
  }

  spawnWhenDelayFinished(): void {
    if (this.sagaDelay <= 0) {
      this.spawnSagaUnits();
    } else {
      TimerStart(this.sagaDelayTimer, this.sagaDelay, false, ()=> {
        this.spawnSagaUnits();
        DestroyTimer(GetExpiredTimer());
      });
    }
  }

  complete(): void {
    super.complete();
  }
}

export class TrunksSaga extends AdvancedSaga implements Saga {
  name: string = '[DBZ] Trunks Saga';

  constructor() {
    super();
    this.sagaDelay = 60;
    this.stats = 100;
  }

  spawnSagaUnits(): void {
    super.spawnSagaUnits();
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 15, "King Cold and Mecha Frieza have come seeking revenge!");

    // create unit
    const maxFriezaHenchmen = 8;
    for (let i = 0; i < maxFriezaHenchmen; ++i) {
      let offsetX = Math.random() * 2000;
      let offsetY = Math.random() * 2000;
      const sagaCreep = CreateUnit(Players.NEUTRAL_HOSTILE, Creep.FriezaPineapple, 18000 + offsetX, 2000 + offsetY, Math.random() * 360);
    }

    this.addHeroListToSaga(["Mecha Frieza", "King Cold"], true);
    
    this.ping()
    this.addActionRewardStats(this);
  }

  update(t: number): void {
  }

  canStart(): boolean {
    return true;
  }

  canComplete(): boolean {
    if (this.bosses.size > 0) {
      return SagaHelper.areAllBossesDead(this.bosses);
    }
    return false;
  }

  start(): void {
    super.start();
    DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 15, "The Frieza Force have invaded Earth!");
    CreepManager.getInstance().upgradeCreeps(SagaUpgradeNames.PRE_TRUNKS);
    this.spawnWhenDelayFinished();
  }

  spawnWhenDelayFinished(): void {
    if (this.sagaDelay <= 0) {
      this.spawnSagaUnits();
    } else {
      TimerStart(this.sagaDelayTimer, this.sagaDelay, false, ()=> {
        this.spawnSagaUnits();
        DestroyTimer(GetExpiredTimer());
      });
    }
  }

  complete(): void {
    super.complete();
    CreepManager.getInstance().upgradeCreeps(SagaUpgradeNames.POST_TRUNKS);
  }
}