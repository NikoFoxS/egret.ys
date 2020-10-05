namespace script {
    export interface CountDown {
        count(current, total);
    }

    export class CountDownScript extends ys.Script {
        constructor(view: CountDown, time: number) {
            super();

            this.current = 0;
            this.total = time;

            this.bind(this);
        }

        Reset()
        {
            this.current = 0;
        }

        Start()
        {

        }

        private current: number;
        private total: number;
    }
}