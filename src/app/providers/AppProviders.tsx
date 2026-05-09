import { PageController } from '@/pages';
import { DialogModal } from '@/widgets/dialog-modal';
import { ErrorHandler } from '@/widgets/error-handler';
import { PreloadImages } from '@/widgets/preload-images';
import { Loader } from '@/widgets/loader';
import { ConnectionLoader } from '@/widgets/connection-loader';

export function AppProviders() {
  return (
    <>
      <PreloadImages />

      <ErrorHandler>
        <Loader>
          <>
            <ConnectionLoader />
            <DialogModal />
            <PageController />
          </>
        </Loader>
      </ErrorHandler>
    </>
  );
}
