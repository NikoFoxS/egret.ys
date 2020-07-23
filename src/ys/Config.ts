class Config {
    public groups: string[]
    public resourceJSON: string
    public resourceRoot: string;
    public release: boolean;
    public scaleMode: string;
    public orientation:string;
    public width: number;
    public height: number;
    public fps: number = 60;
    public versionFun:Function;
    public proxy:any[];
    public command:any[];
    public mock:boolean;
}