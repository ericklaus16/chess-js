abstract class PieceClass {
    constructor(
        private color: string,
        private type: string,
        private position: [number, number],
    ) {}
    
    public getColor(): string {
        return this.color;
    }

    public getType(): string {
        return this.type;
    }
    
    public getPosition(): [number, number] {
        return this.position;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public setPosition(position: [number, number]): void {
        this.position = position;
    }
    
    public moveTo(position: [number, number]): void {
        this.position = position;
    }
    
    public abstract getMoves(): [number, number][];
}

export default PieceClass;