import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from "../ofertas.service";
import { Oferta } from '../shared/oferta.model';
import { Observable, interval, Observer, Subscription } from 'rxjs';

@Component({
    selector: 'app-oferta',
    templateUrl: './oferta.component.html',
    styleUrls: ['./oferta.component.css'],
    providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

    public oferta: Oferta;
    public imagemDestaque: string;

    private tempoObservableSubscription: Subscription;
    private meuOservableTesteSubscription: Subscription;

    constructor(
        private route: ActivatedRoute, 
        private ofertasService: OfertasService
        ) { }

    ngOnDestroy(): void {
        this.meuOservableTesteSubscription.unsubscribe();
        this.tempoObservableSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
            .then((oferta: any) => {
                this.oferta = oferta[0];
                this.imagemDestaque = oferta[0].imagens[0].url;
            });

        //Observable (observável)
        let meuObservableTeste = Observable.create((observer: Observer<string>) => {
            observer.next("Primeiro evento do stream");
            observer.next("Segundo evento do stream");
            observer.complete();
            observer.error("Erro no evento");
        });

        //Observable (observador)
        this.meuOservableTesteSubscription = meuObservableTeste.subscribe(
            (resultado: any) => console.log(resultado), // next()
            (erro: string) => console.log(erro), // error()
            () => console.log("Stream foi finalizada") // complete()
        );

        
        let tempo = interval(500);
        this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
            console.log(intervalo);
        });

        /*
        this.route.params.subscribe(
            (parametro: any) => console.log(parametro),
            (erro: any) => console.log(erro),
            () => console.log("Processamento foi classificado como concluído!")
        );
        */
    }

}
