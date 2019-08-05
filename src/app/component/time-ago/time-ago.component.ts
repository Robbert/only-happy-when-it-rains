import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { formatDistance } from 'date-fns';
import { iso8601 } from '../../util/time';

@Component({
    selector: 'lib-time-ago',
    templateUrl: './time-ago.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeAgoComponent {
    @Input('time') public time: number;
    @Input('relativeTo') public relativeTo: number = Date.now();

    public iso8601 = iso8601;
    public formatDistance = formatDistance;
}
