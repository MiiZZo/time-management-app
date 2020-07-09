import { observable, action } from 'mobx';

export class Pomodoro {
    @observable 
    soundOff: boolean = false
}
