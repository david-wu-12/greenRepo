import { Component, OnInit, TemplateRef, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import { Router, NavigationEnd  } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DocStore } from '../stores/doc.store';


@Component({
  selector: 'app-docreq',
  templateUrl: './docreq.component.html',
  styleUrls: ['./docreq.component.css'],
})
export class DocreqComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  filterToggle: any = false;
  dropdownText: any = 'Select REQUEST Template';
  uniqueOwners: any = [];
  selectedOwner: any = [];
  docRequestlist = [];
  storedDocList = [];
  storedDocListTemp = [];
  selectedDoc: any;
  selectedDocTemp: any;
  actSub: any;
  showUpDoc: any = false;
  docSub: any;

  constructor(private modalService: BsModalService,
          private actRoute: ActivatedRoute, private docStore: DocStore ) { }

  ngOnInit() {
    this.actSub = this.actRoute.params.subscribe(params => {
      console.log(params);
        this.showUpDoc = false;
        this.docRequestlist = [];
   });
    }

  getUniqueOwners() {
    this.docRequestlist.forEach(e => {
      if ( this.uniqueOwners.findIndex( u => u.Owner === e.Owner) > -1) {
      } else {
        this.uniqueOwners.push(e);
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.uniqueOwners = [];
    this.selectedOwner = [];
    this.getUniqueOwners();
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-lg' }));
  }

  editDoc(template: TemplateRef<any>, selDoc) {
    this.selectedDoc = '';
    this.selectedDoc = _.cloneDeep(selDoc);
    this.selectedDocTemp = _.cloneDeep(selDoc);
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-lg' }));
  }

  saveDoc(formToEdit: NgForm) {
    console.log(formToEdit);
    const foundval =  this.docRequestlist.find( x => x.Ref === this.selectedDocTemp.Ref);
    console.log(foundval);
    foundval.Ref =  formToEdit.value.ref ;
    foundval.RelatedSystem =  formToEdit.value.rs ;
    foundval.RelatedControl =   formToEdit.value.rc ;
    foundval.ControlName =   formToEdit.value.cn ;
    foundval.DocumentReuqest =  formToEdit.value.docR ;
    foundval.TypeofEvidence =   formToEdit.value.toe;
    foundval.Owner =   formToEdit.value.owned ;
    foundval.DateRequested =  formToEdit.value.dr;
    foundval.DateDue =   formToEdit.value.dd ;
    foundval.Status =  formToEdit.value.status;
    foundval.Comments =   formToEdit.value.coms ;

    this.modalRef.hide();
  }

  addForm(formToAdd: NgForm) {
    console.log(formToAdd);
    const newDoc = {
      Ref: 'N/A',
      RelatedSystem: 'N/A',
      RelatedControl: 'N/A',
      ControlName: 'N/A',
      DocumentReuqest: 'N/A',
      TypeofEvidence: 'N/A',
      Owner: 'N/A',
      DateRequested: 'N/A',
      DateDue: 'N/A',
      Status: 'N/A',
      DateUp: 'N/A',
      Comments: 'N/A',
      ShowDocc: false
    };
    if ( !(formToAdd.value.comment.trim() === '') ) {
      newDoc.Comments = formToAdd.value.comment.trim();
      formToAdd.controls.comment.setValue('');
    }
    if ( !(formToAdd.value.conName.trim() === '') ) {
      newDoc.ControlName = formToAdd.value.conName.trim();
      formToAdd.controls.conName.setValue('');
    }
    if ( !(formToAdd.value.dateDue.trim() === '') ) {
      newDoc.DateDue = formToAdd.value.dateDue.trim();
      formToAdd.controls.dateDue.setValue('');
    }
    if ( !(formToAdd.value.dateReq.trim() === '') ) {
      newDoc.DateRequested = formToAdd.value.dateReq.trim();
      formToAdd.controls.dateReq.setValue('');

    }
    if ( !(formToAdd.value.docReq.trim() === '') ) {
      newDoc.DocumentReuqest = formToAdd.value.docReq.trim();
      formToAdd.controls.docReq.setValue('');

    }
    if ( !(formToAdd.value.owner.trim() === '') ) {
      newDoc.Owner = formToAdd.value.owner.trim();
      formToAdd.controls.owner.setValue('');

    }
    if ( !(formToAdd.value.ref.trim() === '') ) {
      newDoc.Ref = formToAdd.value.ref.trim();
      formToAdd.controls.ref.setValue('');

    }
    if ( !(formToAdd.value.relCon.trim() === '') ) {
      newDoc.RelatedControl = formToAdd.value.relCon.trim();
      formToAdd.controls.relCon.setValue('');

    }
    if ( !(formToAdd.value.relSys.trim() === '') ) {
      newDoc.RelatedSystem = formToAdd.value.relSys.trim();
      formToAdd.controls.relSys.setValue('');

    }
    if ( !(formToAdd.value.toe.trim() === '') ) {
      newDoc.TypeofEvidence = formToAdd.value.toe.trim();
      formToAdd.controls.toe.setValue('');

    }
    newDoc.Status = 'Pending';
    newDoc.DateUp = 'N/A';
    this.docRequestlist.push(newDoc);
  }

  removeDoc(doc) {
    const indexToRemove = this.docRequestlist.findIndex(d => d.Ref === doc.Ref);
    this.docRequestlist.splice(indexToRemove, 1);

  }

  filterOwner() {
    this.filterToggle = !this.filterToggle;
    if (this.filterToggle) {
      this.docRequestlist.sort(function(a, b) {
        return a.Owner.localeCompare(b.Owner);
      });
    } else {
      this.docRequestlist.sort(function(a, b) {
        return b.Owner.localeCompare(a.Owner);
    });
    }

  }

  filterDR() {
    this.filterToggle = !this.filterToggle;
    if (this.filterToggle) {
      this.docRequestlist.sort(function(a, b) {
        return new Date(b.DateRequested).getTime() - new Date(a.DateRequested).getTime();
      });
    } else {
      this.docRequestlist.sort(function(a, b) {
        return new Date(a.DateRequested).getTime() - new Date(b.DateRequested).getTime();
      });
    }

  }

  filterDD() {
    this.filterToggle = !this.filterToggle;
    if (this.filterToggle) {
      this.docRequestlist.sort(function(a, b) {
        return new Date(b.DateDue).getTime() - new Date(a.DateDue).getTime();
      });
    } else {
      this.docRequestlist.sort(function(a, b) {
        return new Date(a.DateDue).getTime() - new Date(b.DateDue).getTime();
    });
    }

  }

  filterStatus() {
    this.filterToggle = !this.filterToggle;
    if (this.filterToggle) {
      this.docRequestlist.sort(function(a, b) {
        return a.Status.localeCompare(b.Status);
      });
    } else {
      this.docRequestlist.sort(function(a, b) {
        return b.Status.localeCompare(a.Status);
    });
    }

  }

  getdocData(formToChk: NgForm) {
    console.log(formToChk);
    this.selectedOwner = this.docRequestlist.filter( d => d.Owner === formToChk.value.ownerSel );
    this.selectedOwner = this.selectedOwner.filter( e => e.Status === 'Pending' );
    console.log(this.selectedOwner);

  }

  checkRequest (requestType) {

    this.dropdownText = requestType;
    this.docRequestlist = [
        {
          Ref: '10',
          RelatedSystem: 'AD',
          RelatedControl: 'IT ELC-01',
          ControlName: 'IT POLICIES',
          DocumentReuqest: 'System generated list of all users with access to AD,' +
           ' including all attributes listed in the embedded comments of this cell.' +
          'Please include the query or screenshot used to generate the list',
          TypeofEvidence: 'System-generated',
          Owner: 'Dwayne Johnson',
          DateRequested: '12/12/2012',
          DateDue: '1/12/2020',
          Status: 'Pending',
          DateUp: 'N/A',
          Comments: 'there are no comments',
          ShowDocc: false
       },
       {
        Ref: '100',
        RelatedSystem: 'Application A',
        RelatedControl: 'IT ELC-02',
        ControlName: 'User Access Review',
        DocumentReuqest: 'SOC1 reviews providing coverage over 20xx for all applicable service providers',
        TypeofEvidence: 'System-generated',
        Owner: '',
        DateRequested: '',
        DateDue: '',
        Status: 'Pending',
        DateUp: 'N/A',
        Comments: '',
        ShowDocc: false

        },
        {
          Ref: '11',
          RelatedSystem: 'Application B',
          RelatedControl: 'MS-01',
          ControlName: 'Admin Access Review',
          DocumentReuqest: 'Evidence that the Culligan Corporate Security Policies and Procedures are'
          + 'communicated to employees and/or accessible via a central repository',
          TypeofEvidence: 'Manual',
          Owner: 'Tom Brady',
          DateRequested: '12/12/2014',
          DateDue: '1/13/2020',
          Status: 'Pending',
          DateUp: 'N/A',
          Comments: 'there are no comments',
          ShowDocc: false

        },
       {
          Ref: '13',
          RelatedSystem: 'Application C',
          RelatedControl: 'IT ELC-05',
          ControlName: 'Change Testing, Change Reuqest Aapproval, Change Migration Approval ',
          DocumentReuqest: 'System generated listing of users with access to modify the frequency of Application A batch jobs.',
          TypeofEvidence: 'System-generated',
          Owner: 'Peyton Manning',
          DateRequested: '12/12/2016',
          DateDue: '2/12/2020',
          Status: 'Pending',
          DateUp: 'N/A',
          Comments: 'there are no comments',
          ShowDocc: false

       },
        {
          Ref: '14',
          RelatedSystem: 'Application A, Application B, Application C',
          RelatedControl: 'MC-05',
          ControlName: 'Emergency Changes',
          DocumentReuqest: 'Evidence that the Culligan Corporate Security Policies and Procedures are'
          + 'communicated to employees and/or accessible via a central repository',
          TypeofEvidence: 'System-generated',
          Owner: '',
          DateRequested: '',
          DateDue: '',
          Status: 'Pending',
          DateUp: 'N/A',
          Comments: '',
          ShowDocc: false

        },
      ];

      if (requestType.includes('IT') ) {
        this.docRequestlist.push(        {
          Ref: '14',
          RelatedSystem: 'Application A, Application B, Application C',
          RelatedControl: 'MC-05',
          ControlName: 'Emergency Changes',
          DocumentReuqest: 'Evidence that the Culligan Corporate Security Policies and Procedures are'
          + 'communicated to employees and/or accessible via a central repository',
          TypeofEvidence: 'System-generated',
          Owner: '',
          DateRequested: '',
          DateDue: '',
          Status: 'Pending',
          DateUp: 'N/A',
          Comments: '',
          ShowDocc: false

        });
      }
  }

  storeDocument() {
    this.docStore.updateData(this.docRequestlist);
  }

  ngOnDestroy() {

  }

}
