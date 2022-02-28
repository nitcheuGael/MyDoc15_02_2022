
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constante } from 'src/app/entite/constante';
import { demande } from 'src/app/entite/demande';
import { DialogConfirmService } from 'src/app/service/dialog-confirm.service';
import { DialogConfirmeService } from 'src/app/service/Dialog/dialog-confirme.service';
import { ServiceBdService } from 'src/app/service/service-bd.service';
import { MailService } from 'src/app/service/smsMail/mail.service';




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
  testeDeRemplissage = false
  demandeIncomplete: demande[] = [];
  // demandeIncomplete1: any
  statutDemanI = 'incomplet'
  statutDemanSoum = 'enCour'
  idDemandeI = ''
  idDemandeRecente = ''
  typeDemande: any;
  monObjet: any = localStorage.getItem('testModif');



  constructor(
    private afAuth: AngularFireAuth,
    private ServiceBd: ServiceBdService,
    private dialogoService: DialogConfirmeService,
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    public serviceMailSms: MailService,

    private message_confirme: DialogConfirmService


  ) { }

  ngOnInit(): void {
    this.initialisationformulair()
    this.afAuth.currentUser.then((user) => {
      this.id = user?.uid
      if (this.monObjet == null) {
        this.testPremplissage()
      } else {
        this.testModif = true
        this.testEnregis = false
        this.modifDemande()
        localStorage.removeItem('testModif')
      }

    })

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


  testPremplissage() {

    this.ServiceBd.getDemandeByIdAnd_Statut(this.id, this.statutDemanI).then((data: any) => {
      this.demandeIncomplete = data.demande as demande[];
      if (this.demandeIncomplete.length > 0) {
        this.testeDeRemplissage = true
        // Dans ce cas je remplis le formulaire

        this.idDemandeI = data.demande[0].id
        this.firstFormGroup = new FormGroup({
          nom: new FormControl(this.demandeIncomplete[0].nom),
          prenom: new FormControl(this.demandeIncomplete[0].prenom),
          email: new FormControl(this.demandeIncomplete[0].email),
          tel: new FormControl(this.demandeIncomplete[0].telephone),
          typedoc: new FormControl(this.demandeIncomplete[0].typeDemande),
          villeRetrait: new FormControl(this.demandeIncomplete[0].VilleRetrait),
          adresseComp: new FormControl(this.demandeIncomplete[0].VilleDemandeur),
          commentaire: new FormControl(this.demandeIncomplete[0].commentaire),
          ville: new FormControl(this.demandeIncomplete[0].VilleDemandeur),
          adresseRetrait: new FormControl(this.demandeIncomplete[0].adresseRetrait),

        })
        this.submitted = true
      } else {

        this.testeDeRemplissage = false
        this.submitted = false

      }
    })

  }

  testPremplissageScond() {

    this.ServiceBd.getDemandeByIdAnd_Statut(this.id, this.statutDemanI).then((data: any) => {
      this.demandeIncomplete = data.demande as demande[];
      if (this.demandeIncomplete.length > 0) {
        this.testeDeRemplissage = true

      } else {
        this.testeDeRemplissage = false

      }
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
    this.testPremplissageScond()

    this.submitted = true
    // Je teste avec la valeure boolene si je dois Modifier?(valeure True) ou Enregistrer(valeure false)

    if (!this.testeDeRemplissage) {

      if (!this.firstFormGroup.invalid) {
        //PREMIERE REMPLISSAGE AYANT TOUT REMPLIR
        this.dialogoService.confirmActionAlertDialogue('Voullez vous enregistrer cette demande? ').then(result => {

          if (result) {
            if (this.id != null) {

              var demandelist = new demande(this.nom?.value, this.prenom?.value, this.email?.value
                , this.tel?.value, this.id, this.typedoc?.value, this.statut, this.adresseRetrait?.value, this.villeRetrait?.value,
                this.adresseComp?.value, this.ville?.value, this.photo?.value, 'contra', this.commentaire?.value)

              this.ServiceBd.addDemande(demandelist).then((data: any) => {
                this.idDemandeRecente = data.id
                this.submitted = false
                this.firstFormGroup.reset();
                // this.dialog.open()
                this.dialogoService.confirmActionAlertDialogue('Souhaitez vous soumettres directement cette demande?').then((result => {

                  this.ServiceBd.editstatut(this.idDemandeRecente, this.statutDemanSoum).then((resul => {
                    // DEMANDE SOUMIS AVEC SUCCES
                    this.message_confirme.confirmActionAlertDialogue('Demande soumis avec succes')


                    this.sendMail(this.idDemandeRecente, this.nom?.value, this.prenom?.value)
                    this.sendSms(this.idDemandeRecente, this.nom?.value, this.prenom?.value)
                    this.sendSmsClient(this.tel?.value, this.idDemandeRecente)


                  })).catch(err => {
                    // ECHEC DE  SOUMISSION DE LA DEMANDE 
                    this.message_confirme.confirmActionAlertDialogue('Echec de soumission de la demande')
                    this.message_confirme.confirmActionAlertDialogue('Demande enregistres avec succes')
                  })
                  // apres soumision il est renvoyer au dashbord
                  this.router.navigate(['/dashboard']);
                })).catch(err => {
                  this.toast.info("Demande enregistres avec succes")
                  this.message_confirme.confirmActionAlertDialogue('Demande enregistres avec succes')

                })



              }).catch(erreur => {
                this.toast.error('Erreur d enregistrement de la demande', 'Enregistrement', {
                  timeOut: 3000,
                })
                this.message_confirme.confirmActionAlertDialogue('Echec de l enregistrement de la demande')

              })
              this.submitted = false



            } else {
              this.toast.warning('Utilisateur inconnue')
            }
          }
        });
      } else {
        //PREMIERE REMPLIRE MAIS PAS TOUS LES ELLEMENTS REMPLIRE
        if (!this.nom?.invalid && this.nom?.value !== ' ' && this.nom?.value !== '  ' && this.nom?.value !== '   ') {
          this.statut = this.statutDemanI
          this.dialogoService.confirmActionAlertDialogue('Voullez  enregistrer cette demande? ').then(result => {

            if (result) {
              if (this.id != null) {

                var demandelist = new demande(this.nom?.value, this.prenom?.value, this.email?.value
                  , this.tel?.value, this.id, this.typedoc?.value, this.statut, this.adresseRetrait?.value, this.villeRetrait?.value,
                  this.adresseComp?.value, this.ville?.value, this.photo?.value, 'contra', this.commentaire?.value)

                this.ServiceBd.addDemande(demandelist).then((data: any) => {
                  this.toast.info("Demande enregistres avec succes")
                  this.message_confirme.confirmActionAlertDialogue('Demande enregistres avec succes')

                  this.submitted = false



                }).catch(error => {
                  this.message_confirme.confirmActionAlertDialogue('Echec d enregistres ')

                })
                this.submitted = false

              } else {

                this.message_confirme.confirmActionAlertDialogue('Utilisateur inconnue')

              }
            }
          });

        } else {
          this.toast.error('Veuillez renseigner au moins le nom et prenom', 'erreur d enregistrement')
          this.message_confirme.confirmActionAlertDialogue('Veuillez renseigner au moins le nom et prenom')

        }


      }

    } else {
      // AUTRES REMPLISSAGE AVEC TOUS LES ELEMENTS CORRECTEMENT REMPLIR

      // ici il a eu une demande imcomplete on utilise a ce niveau la modification

      this.firstFormGroup = this.formBuilder.group({
        nom: [this.nom?.value, Validators.required],
        prenom: [this.prenom?.value, Validators.required],
        email: [this.email?.value, Validators.email],
        tel: [this.tel?.value, [
          Validators.required,

          Validators.pattern("^((\\+237-?)|0)?[0-9]{9}$")
        ]],
        typedoc: [this.typedoc?.value, Validators.required],
        commentaire: [this.commentaire?.value],
        ville: [this.ville?.value, Validators.required],
        adresseComp: [this.adresseComp?.value, Validators.required],
        villeRetrait: [this.villeRetrait?.value, Validators.required],
        adresseRetrait: [this.adresseRetrait?.value, Validators.required],
        photo: ['']
      })




      if (!this.firstFormGroup.invalid) {
        this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment modifier cette demande? ').then(result => {
          if (result) {
            var demandelist = new demande(this.nom?.value, this.prenom?.value, this.email?.value
              , this.tel?.value, this.id, this.typedoc?.value, this.statut, this.adresseRetrait?.value, this.villeRetrait?.value,
              this.adresseComp?.value, this.ville?.value, this.photo?.value, 'contra', this.commentaire?.value)
            this.ServiceBd.editAllDemande(demandelist, this.idDemandeI).then((valut) => {
              this.toast.info("demande Modifier avec succes")

              this.dialogoService.confirmActionAlertDialogue('Souhaitez vous soumettres directement cette demande?').then((result => {

                //SOUMISSION DE LA DEMANDE : IDDEMANDE 
                this.ServiceBd.editstatut(this.idDemandeI, this.statutDemanSoum).then((resul => {
                  // DEMANDE SOUMIS AVEC SUCCES
                  this.message_confirme.confirmActionAlertDialogue('Demande soumis avec succes')
                  this.sendMail(this.idDemandeI, this.nom?.value, this.prenom?.value)
                  this.sendSms(this.idDemandeI, this.nom?.value, this.prenom?.value)
                  this.sendSmsClient(this.tel?.value, this.idDemandeI)

                })).catch(err => {
                  // ECHEC DE  SOUMISSION DE LA DEMANDE 
                  this.message_confirme.confirmActionAlertDialogue('Echec de soumission de la demande')

                })
                // apres soumision il est renvoyer au dashbord
                this.router.navigate(['/dashboard']);
              }))


            }).catch((erreur => {
            }))
            this.submitted = true

          }
        });
      } else {
        // AUTRES REMPLISSAGE AVEC LES ELEMENTS PAS CORRECTEMENT REMPLIR
        console.log('Valeure de la console ', this.nom?.value !== ' ')
        if (!this.nom?.invalid && this.nom?.value !== ' ' && this.nom?.value !== '  ' && this.nom?.value !== '   ') {

          this.statut = this.statutDemanI
          this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment modifier cette demande? ').then(result => {
            if (result) {
              var demandelist = new demande(this.nom?.value, this.prenom?.value, this.email?.value
                , this.tel?.value, this.id, this.typedoc?.value, this.statut, this.adresseRetrait?.value, this.villeRetrait?.value,
                this.adresseComp?.value, this.ville?.value, this.photo?.value, 'contra', this.commentaire?.value)
              this.ServiceBd.editAllDemande(demandelist, this.idDemandeI).then((valut) => {
                this.toast.info("demande Modifier avec succes")
                this.message_confirme.confirmActionAlertDialogue('Demande Modifier avec succes')

              }).catch((erreur => {
                this.message_confirme.confirmActionAlertDialogue('Echec d enregistrement de la demande')

              }))


            }
          });
        } else {
          this.toast.error('Veuillez renseigner au moins le nom et prenom', 'erreur d enregistrement')
          this.message_confirme.confirmActionAlertDialogue('Veuillez renseigner au moins le nom et prenom')

        }
      }

    }


  }



  modifDemande() {
    this.listeDonnee = JSON.parse(localStorage.getItem('modifierDemande') || '') as demande

    this.idDemande = this.listeDonnee.id
    this.firstFormGroup = this.formBuilder.group({
      nom: [this.listeDonnee.nom, Validators.required],
      prenom: [this.listeDonnee.prenom, Validators.required],
      email: [this.listeDonnee.email, Validators.email],
      tel: [this.listeDonnee.tel, [
        Validators.required,

        Validators.pattern("^((\\+237-?)|0)?[0-9]{9}$")
      ]],
      typedoc: [this.listeDonnee.typeDemande, Validators.required],
      commentaire: [this.listeDonnee.commentaire],
      ville: [this.listeDonnee.villeDemandeur, Validators.required],
      adresseComp: [this.listeDonnee.adresseDemandeur, Validators.required],
      villeRetrait: [this.listeDonnee.villeRetrait, Validators.required],
      adresseRetrait: [this.listeDonnee.adresseRetrait, Validators.required],
      photo: ['']
    })
    localStorage.removeItem('modifierDemande')
  }

  editeDemande() {

    this.submitted = true
    if (!this.firstFormGroup.invalid) {
      this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment modifier cette demande?').then(result => {
        if (result) {
          var demandelist = new demande(this.nom?.value, this.prenom?.value, this.email?.value
            , this.tel?.value, this.id, this.typedoc?.value, this.statut, this.adresseRetrait?.value, this.villeRetrait?.value,
            this.adresseComp?.value, this.ville?.value, this.photo?.value, 'contra', this.commentaire?.value)
          this.ServiceBd.editAllDemande(demandelist, this.idDemande).then((valut) => {
            this.toast.info("demande Modifier avec succes")
            this.message_confirme.confirmActionAlertDialogue('Demande Modifier avec succes')


            this.dialogoService.confirmActionAlertDialogue('Souhaitez vous soumettres directement cette demande?').then((result => {

              //SOUMISSION DE LA DEMANDE : IDDEMANDE 
              this.ServiceBd.editstatut(this.idDemande, this.statutDemanSoum).then((resul => {
                this.sendMail(this.idDemande, this.nom?.value, this.prenom?.value)
                this.sendSms(this.idDemande, this.nom?.value, this.prenom?.value)
                this.sendSmsClient(this.tel?.value, this.idDemande)
                // DEMANDE SOUMIS AVEC SUCCES
              })).catch(err => {
                // ECHEC DE  SOUMISSION DE LA DEMANDE 
              })
              // apres soumision il est renvoyer au dashbord
              this.router.navigate(['/dashboard']);
            })).catch(erreure => {

            })
          }).catch((erreur => {
          }))
        }
      });
    } else {
      // window.alert('Veuillez renseigner tous les champs oubligatoire')
      this.message_confirme.confirmActionAlertDialogue('Veuillez renseigner tous les champs oubligatoire')

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


  // Soumision de la demande

  soumettreDemande() {
    if (!this.firstFormGroup.invalid) {
      this.dialogoService.confirmActionAlertDialogue('Voullez vous vraiment soumettre cette demande? ').then(result => {
        if (result) {
          this.ServiceBd.editstatut(this.idDemande, 'enCour').then((data) => {

          }).catch(erro => {

          })
        } else {

        }
      });
    } else {
      // window.alert('Veuillez renseigner tous les champs oubligatoire')
      this.message_confirme.confirmActionAlertDialogue('Veuillez renseigner tous les champs oubligatoire')

    }
  }



  sendMail(identifiantDemande: string, nomClient: string, prenomClient: string) {
    var email = Constante.emailNotification;
    var objt = "Demande";
    var message = "La demande numero " + ' ' + identifiantDemande + ' de ' + nomClient + '  ' + prenomClient + ' a ete soumise ';
    var entete = 'From: Mydoc@mydoc.cm'
    this.serviceMailSms.sendEmail(email, objt, message, entete).then((projet) => {
      console.log('Envoi du mail avec succes', projet)

    }).catch(rejet => {
      console.log('erreur d envoi du mail ', rejet)
        ;
    })
  }
  sendSms(identifiantDemande: string, nomClient: string, prenomClient: string) {
    this.serviceMailSms.sendSms("MyDoc", "00237678424125", "La demande numero " + ' ' + identifiantDemande + ' de ' + nomClient + '  ' + prenomClient + ' a ete soumise ').then((projet) => {
      console.log('envoi de sms god 00237698893924', projet)

    }).catch(rejects => {
      console.log('erreur d envoi de sms ', rejects)
    })
  }

  sendSmsClient(numeroClient: string, identifiantDemande: string) {
    this.serviceMailSms.sendSms("MyDoc", "00237" + numeroClient, " Votre demande   ID: " + identifiantDemande + " a ete bien soumise").then((projet) => {
      console.log('envoi de sms god ', projet)

    }).catch(rejects => {
      console.log('erreur d envoi de sms ', rejects)
    })
  }



}
