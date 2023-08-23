import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "src/app/core/models/contact";

@Component({
  selector: 'contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent {
  contact!: Contact;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.contact = this.route.snapshot.data["contact"];

    if(this.contact == null) {
      this.router.navigate(['/404']);
    }
  }
}