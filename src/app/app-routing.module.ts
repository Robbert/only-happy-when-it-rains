import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesOverviewComponent } from './container/cities-overview/cities-overview.component';

const routes: Routes = [{ path: '', component: CitiesOverviewComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
