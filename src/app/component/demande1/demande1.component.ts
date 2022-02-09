
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { demande } from 'src/app/entite/demande';
import { DialogConfirmeService } from 'src/app/service/Dialog/dialog-confirme.service';
import { ServiceBdService } from 'src/app/service/service-bd.service';


@Component({
  selector: 'app-demande1',
  templateUrl: './demande1.component.html',
  styleUrls: ['./demande1.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: false },
    },
  ]
})
export class Demande1Component implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup1!: FormGroup;
  secondFormGroup2!: FormGroup;
  secondFormGroup3!: FormGroup;

  response: string | null = '';
  idUser: string | null = '';
  id: any;
  statut = 'atente';
  listeDonnee: any;
  idDemande = ''
  testModif = false
  testEnregis = true
  submitted = false;


  constructor(
    private afAuth: AngularFireAuth,
    private ServiceBd: ServiceBdService,
    private dialogoService: DialogConfirmeService,
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialisationformulair()
    this.afAuth.currentUser.then((user) => {
      this.id = user?.uid
    })
    this.modifDemande()
  }


  initialisationformulair() {
    this.firstFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.email],
      tel: ['', [
        Validators.required,

        Validators.pattern("^((\\+237-?)|0)?[0-9]{9}$")
      ]],
      typedoc: ['', Validators.required],
      commentaire: [''],
      ville: ['', Validators.required],
      adresseComp: ['', Validators.required],
      villeRetrait: ['', Validators.required],
      adresseRetrait: ['', Validators.required],
      photo: ['']
    })

  }


  get nom() {
    return this.firstFormGroup!.get('nom')
  }

  get prenom() {
    return this.firstFormGroup!.get('prenom')
  }
  get email() {
    return this.firstFormGroup!.get('email')
  }
  get tel() {
    return this.firstFormGroup!.get('tel')
  }

  get typedoc() {
    return this.firstFormGroup!.get('typedoc')
  }

  get commentaire() {
    return this.firstFormGroup!.get('commentaire')
  }

  get ville() {
    return this.firstFormGroup!.get('ville')
  }
  get adresseComp() {
    return this.firstFormGroup!.get('adresseComp')
  }

  get villeRetrait() {
    return this.firstFormGroup!.get('villeRetrait')
  }
  get adresseRetrait() {
    return this.firstFormGroup!.get('adresseRetrait')
  }
  get photo() {
    return this.firstFormGroup!.get('')
  }



  addDemande() {
    this.submitted = true
    if (!this.firstFormGroup.invalid) {
      this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment enregistrer cette demande? ').then(result => {

        if (result) {
          if (this.id != null) {

            var demandelist = new demande(this.nom?.value, this.prenom?.value, this.email?.value
              , this.tel?.value, this.id, this.typedoc?.value, this.statut, this.adresseRetrait?.value, this.villeRetrait?.value,
              this.adresseComp?.value, this.ville?.value, this.photo?.value, 'contra', this.commentaire?.value)

            this.ServiceBd.addDemande(demandelist).then((data: any) => {
              this.toast.info("demande enregistres avec succes")
              this.submitted = false
              this.firstFormGroup.reset();

            }).catch(error => {
            })
          } else {
            this.toast.warning('Utilisateur inconnue')
          }
        }
      });
    } else {
      window.alert('Veuillez renseigner tous les champs oubligatoire')

    }

  }

  modifDemande() {
    // this.dataService.listeDemande.subscribe((donne) => {

    this.listeDonnee = JSON.parse(localStorage.getItem('modifierDemande') || '') as demande
    this.testModif = true
    this.testEnregis = false
    this.idDemande = this.listeDonnee.id

    this.firstFormGroup = new FormGroup({
      nom: new FormControl(this.listeDonnee.nom),
      prenom: new FormControl(this.listeDonnee.prenom),
      email: new FormControl(this.listeDonnee.email),
      tel: new FormControl(this.listeDonnee.tel),
      typedoc: new FormControl(this.listeDonnee.typeDemande),
      villeRetrait: new FormControl(this.listeDonnee.villeRetrait),
      adresseComp: new FormControl(this.listeDonnee.villeDemandeur),
      commentaire: new FormControl(this.listeDonnee.commentaire),
      ville: new FormControl(this.listeDonnee.VilleDemandeur),
      adresseRetrait: new FormControl(this.listeDonnee.adresseRetrait),

    })
    localStorage.removeItem('modifierDemande')
    // })

  }

  editeDemande() {
    this.submitted = true
    if (!this.firstFormGroup.invalid) {
      this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment modifier cette demande? ').then(result => {
        if (result) {
          var demandelist = new demande(this.nom?.value, this.prenom?.value, this.email?.value
            , this.tel?.value, this.id, this.typedoc?.value, this.statut, this.adresseRetrait?.value, this.villeRetrait?.value,
            this.adresseComp?.value, this.ville?.value, this.photo?.value, 'contra', this.commentaire?.value)
          this.ServiceBd.editAllDemande(demandelist, this.idDemande).then((valut) => {
            this.toast.info("demande Modifier avec succes")
            this.router.navigate(['/dashboard']);
          }).catch((erreur => {
          }))
        }
      });
    } else {
      window.alert('Veuillez renseigner tous les champs oubligatoire')
    }
  }

  annuler() {
    this.router.navigate(['/dashboard']);

  }

  valider() {
    this.firstFormGroup.valid
  }

  get f(): { [key: string]: AbstractControl } {
    return this.firstFormGroup.controls;
  }


  onSubmit(): void {
    /* this.submitted = true; */

    if (this.firstFormGroup.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.firstFormGroup.reset();
  }

}
