import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { debounceTime } from "rxjs/operators";
import { async } from "q";
import { ModalController } from "@ionic/angular";
import { DetallesPage } from "../detalles/detalles.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  online = true;
  searchTerm: string;
  tmpItems: any;
  searchTipe: any;
  items = [
    {
      Rango: "Formación",
      Unidad: "Seca",
      Edad: "E",
      Abreviatura: "S"
    },
    {
      Rango: "Formación",
      Unidad: "Socorro",
      Edad: "E",
      Abreviatura: "Soc"
    },
    {
      Rango: "Formación",
      Unidad: "Clay Pebble Beds",
      Edad: "E",
      Abreviatura: "Cpb"
    },
    {
      Rango: "Formación",
      Unidad: "Rumi Cruz",
      Edad: "E",
      Abreviatura: "Rc"
    },
    {
      Rango: "Formación",
      Unidad: "Unacota",
      Edad: "E",
      Abreviatura: "U"
    },
    {
      Rango: "Formación",
      Unidad: "Pilaló",
      Edad: "PcE",
      Abreviatura: "P"
    },
    {
      Rango: "Formación",
      Unidad: "Gallo Rumi",
      Edad: "PcE",
      Abreviatura: "Gr"
    },
    {
      Rango: "Formación",
      Unidad: "Apagua",
      Edad: "PcE",
      Abreviatura: "A"
    },
    {
      Rango: "",
      Unidad: "",
      Edad: "",
      Abreviatura: ""
    },
    {
      Rango: "",
      Unidad: "",
      Edad: "",
      Abreviatura: ""
    },
    {
      Rango: "Formación",
      Unidad: "Jubones",
      Edad: "M",
      Abreviatura: "Sj"
    },
    {
      Rango: "Formación",
      Unidad: "La Fortuna",
      Edad: "O",
      Abreviatura: "Sf"
    },
    {
      Rango: "Formación",
      Unidad: "Plancharumi",
      Edad: "O",
      Abreviatura: "Sp"
    },
    {
      Rango: "Formación",
      Unidad: "Soldados",
      Edad: "O",
      Abreviatura: "Ss"
    },
    {
      Rango: "Formación",
      Unidad: "Cerro Caucay",
      Edad: "O",
      Abreviatura: "Scc"
    },
    {
      Rango: "Formación",
      Unidad: "Río Blanco",
      Edad: "O",
      Abreviatura: "Srb"
    },
    {
      Rango: "Formación",
      Unidad: "Chanlud",
      Edad: "O",
      Abreviatura: "Scd"
    },
    {
      Rango: "Formación",
      Unidad: "Las Trancas",
      Edad: "E",
      Abreviatura: "St"
    },
    {
      Rango: "Formación",
      Unidad: "Ocaña",
      Edad: "E",
      Abreviatura: "So"
    },
    {
      Rango: "",
      Unidad: "",
      Edad: "",
      Abreviatura: ""
    },
    {
      Rango: "Formación",
      Unidad: "Chaquino",
      Edad: "K",
      Abreviatura: "Ch"
    },
    {
      Rango: "Formación",
      Unidad: "Mangahurco",
      Edad: "K",
      Abreviatura: "Mg"
    },
    {
      Rango: "Formación",
      Unidad: "Tronco Quemado",
      Edad: "K",
      Abreviatura: "Tq"
    },
    {
      Rango: "Miembro",
      Unidad: "Cochas",
      Edad: "M",
      Abreviatura: "C"
    },
    {
      Rango: "Miembro",
      Unidad: "Guapán",
      Edad: "M",
      Abreviatura: "G"
    },
    {
      Rango: "Miembro",
      Unidad: "El Carmen",
      Edad: "M",
      Abreviatura: "Ec"
    },
    {
      Rango: "Miembro",
      Unidad: "Lechuza",
      Edad: "Pl",
      Abreviatura: "Lh"
    },
    {
      Rango: "Miembro",
      Unidad: "Placer",
      Edad: "PL",
      Abreviatura: "P"
    },
    {
      Rango: "Miembro",
      Unidad: "La Banda",
      Edad: "M",
      Abreviatura: "Lbd"
    },
    {
      Rango: "Miembro",
      Unidad: "Chaparro",
      Edad: "M",
      Abreviatura: "Chp"
    },
    {
      Rango: "Miembro",
      Unidad: "Llacao",
      Edad: "PL",
      Abreviatura: "Ll"
    }
  ];

  constructor(
    public toastController: ToastController,
    private storage: Storage,
    private modal: ModalController
  ) {
    this.tmpItems = this.items;
  }

  ngOnInit() {
    /*     this.storage.get("online").then(online => {
      this.online = online;
      if (!this.online) {
        this.storage.get("codigos").then(codigos => {
          this.items = JSON.parse(codigos);
          this.tmpItems = this.items;
        });
      }
    }); */
  }

  updateOnline() {
    this.storage.set("online", this.online);
    if (!this.online) {
      this.storage.set("codigos", JSON.stringify(this.items));
    } else {
      // this.loadItemFromNetwork(){
      console.log("los cargo de la red y elimino los locales");
      this.storage.remove("codigos").then(_ => {});
      // }
    }
  }

  setFilteredItems(searhText) {
    if (searhText) {
      const searh = searhText.trim().toLocaleLowerCase();
      this.tmpItems = this.items.filter(item => {
        if (!this.searchTipe) {
          if (
            item.Rango.toLowerCase().includes(searh) ||
            item.Unidad.toLowerCase().includes(searh) ||
            item.Edad.toLowerCase().includes(searh) ||
            item.Abreviatura.toLowerCase().includes(searh)
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          switch (this.searchTipe) {
            case "rango": {
              if (item.Rango.toLowerCase().includes(searh)) {
                return true;
              } else {
                return false;
              }
            }
            case "unidad": {
              if (item.Unidad.toLowerCase().includes(searh)) {
                return true;
              } else {
                return false;
              }
            }
            case "edad": {
              if (item.Edad.toLowerCase().includes(searh)) {
                return true;
              } else {
                return false;
              }
            }
            case "abreviatura": {
              if (item.Abreviatura.toLowerCase().includes(searh)) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      });
    } else {
      this.tmpItems = this.items;
    }
  }

  async showMsg(message = "") {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      closeButtonText: "Cerrar"
    });
    toast.present();
  }

  async detalles(item) {
    const modal = await this.modal.create({
      component: DetallesPage,
      componentProps: { datos: item }
    });
    return await modal.present();
  }
}
