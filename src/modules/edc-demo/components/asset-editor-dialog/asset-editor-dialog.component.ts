import {Component, Inject, OnInit} from '@angular/core';
import { AssetEntryDto, AssetService} from "../../../mgmt-api-client";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageType} from "../../models/storage-type";


@Component({
  selector: 'edc-demo-asset-editor-dialog',
  templateUrl: './asset-editor-dialog.component.html',
  styleUrls: ['./asset-editor-dialog.component.scss']
})
export class AssetEditorDialog implements OnInit {

  id: string = '';
  version: string = '';
  name: string = '';
  contenttype: string = '';

  storageTypeId: string = 'AzureStorage';
  // Azure Account or AWS Region (dependent on selected storage type)
  param1: string = '';

  // Azure Container or AWS S3 Bucket (dependent on selected storage type)
  param2: string = 'src-container';

  //Azure Blob Name or AWS S3 Object Key (dependent on selected storage type)
  param3: string = '';

  constructor(private assetService: AssetService, private dialogRef: MatDialogRef<AssetEditorDialog>,
    @Inject('AWS_REGIONS') public awsRegions: string[], @Inject('STORAGE_TYPES') public storageTypes: StorageType[]) {
  }

  ngOnInit(): void {
  }

  onSave() {
    if(this.storageTypeId=='AzureStorage'){
      const assetEntryDto: AssetEntryDto = {
        asset: {
          properties: {
            "asset:prop:name": this.name,
            "asset:prop:version": this.version,
            "asset:prop:id": this.id,
            "asset:prop:contenttype": this.contenttype,
          }
        },
        dataAddress: {
          properties: {
            "type": this.storageTypeId,
            "account": this.param1,
            "container": this.param2,
            "blobname": this.param3,
            "keyName": `${this.param1}-key1`
          },
        }
      };

      this.dialogRef.close({ assetEntryDto });
    }else if(this.storageTypeId=='AmazonS3'){
      const assetEntryDto: AssetEntryDto = {
        asset: {
          properties: {
            "asset:prop:name": this.name,
            "asset:prop:version": this.version,
            "asset:prop:id": this.id,
            "asset:prop:contenttype": this.contenttype,
          }
        },
        dataAddress: {
          properties: {
            "type": this.storageTypeId,
            "region": this.param1,
            "bucketName": this.param2,
            "keyName": this.param3
          },
        }
      };
      
      this.dialogRef.close({ assetEntryDto });
    }
  }
}
