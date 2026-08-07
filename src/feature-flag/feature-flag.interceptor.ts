import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeatureFlagInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const showSecretFeature = this.configService.get<string>(
      'SHOW_SECRET_FEATURE',
    );
    return next.handle().pipe(
      map((data) => {
        if (showSecretFeature === 'false') {
          const { secretFeature, ...rest } = data;
          return rest;
        } else {
          return data;
        }
      }),
    );
  }
}
