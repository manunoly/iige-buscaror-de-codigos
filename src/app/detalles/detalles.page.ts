import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavParams } from "@ionic/angular";

@Component({
  selector: "app-detalles",
  templateUrl: "./detalles.page.html",
  styleUrls: ["./detalles.page.scss"]
})
export class DetallesPage implements OnInit {
  item;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.item = this.navParams.get("datos");

    // console.log(this.activatedRoute.snapshot.paramMap.get("datos"));
  }
}
