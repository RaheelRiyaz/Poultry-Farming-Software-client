import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { HatchResponse, HatchStatusRequest } from '../../../../models/hatch';
import { environment } from '../../../../../environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hatches',
  templateUrl: './hatches.component.html',
  styleUrl: './hatches.component.scss',
})
export class HatchesComponent {
  constructor(private service: BaseService) {}

  hatches: HatchResponse[] = [];

  ngOnInit(): void {
    this.getAllHatches();
  }

  getAllHatches(): void {
    this.service.Fetch<HatchResponse[]>('hatches/all-hatches').subscribe({
      next: (response) => {
        if (response.isSuccess) this.hatches = response.result;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  async changeHatchStatus(hatchId: string, checkBoxValue: boolean) {
    const hatchStatusRequest: HatchStatusRequest = new HatchStatusRequest(
      checkBoxValue ? 1 : 2,
      hatchId,
      new Date()
    );

    if (checkBoxValue) {
      const { value: date } = await Swal.fire({
        title: 'Select hatch finish date',
        input: 'datetime-local',
      });
      hatchStatusRequest.hatchFinishDate = date;
      return this.updateStatus(hatchStatusRequest);
    }

    environment
      .fireConfirmSwal('Are you sure you want to change hatch status?')
      .then((res) => {
        if (res.isConfirmed) {
          this.updateStatus(hatchStatusRequest);
        }
      });
  }


  
  private updateStatus(hatchStatusRequest: HatchStatusRequest): void {
    this.service
      .Update<HatchStatusRequest, number>(
        hatchStatusRequest,
        'hatches/change-status'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSwal(response.message);
            this.getAllHatches();
          } else environment.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, false);
        },
      });
  }
}
