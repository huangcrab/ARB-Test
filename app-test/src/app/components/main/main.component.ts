import { Component, OnInit } from "@angular/core";
import * as socketIO from "socket.io-client";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  private socket;
  private tables;
  private currentTable;
  private currentField;
  private toggle: boolean = false;
  constructor() {}

  compare(a, b, e, toggle) {
    const index = e.target.textContent.split(" -")[0];
    if (a[index] < b[index]) return toggle ? -1 : 1;
    if (a[index] > b[index]) return toggle ? 1 : -1;
    return 0;
  }

  sortByCol(e) {
    this.toggle = !this.toggle;
    this.currentTable.sort((a, b) => this.compare(a, b, e, this.toggle));
  }

  getFields(items: Array<Object>) {
    return Object.keys(items[0]);
  }

  updateTable(e) {
    this.currentTable = this.tables[e.target.value].data;
    this.currentField = this.getFields(this.tables[e.target.value].data);
  }

  ngOnInit() {
    this.socket = socketIO("http://localhost:5000");

    this.socket.on("drop", data => {
      this.tables = data;
      this.currentTable = data[0].data;
      this.currentField = this.getFields(data[0].data);
    });
  }
}
