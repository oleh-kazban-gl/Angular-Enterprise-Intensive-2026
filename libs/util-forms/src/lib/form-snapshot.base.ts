import { HasPendingChanges } from './has-pending-changes';

export abstract class FormSnapshotBase implements HasPendingChanges {
  private initialSnapshot: string | undefined;

  protected takeSnapshot(): void {
    this.initialSnapshot = this.serialize();
  }

  protected abstract formSnapshot(): unknown;

  hasPendingChanges(): boolean {
    if (this.initialSnapshot === undefined) {
      return false;
    }
    return this.serialize() !== this.initialSnapshot;
  }

  private serialize(): string {
    return JSON.stringify(this.formSnapshot());
  }
}
