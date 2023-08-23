import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "src/app/core/models/contact";

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent {
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