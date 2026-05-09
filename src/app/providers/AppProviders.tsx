import { DialogModal } from '@/widgets/dialog-modal';
import { ErrorHandler } from '@/widgets/error-handler';
import { PreloadImages } from '@/widgets/preload-images';
import { Loader } from '@/widgets/loader';
import { ConnectionLoader } from '@/widgets/connection-loader';
import { GameLayout } from '../layouts/GameLayout';

export function AppProviders() {
  return (
    <>
      <PreloadImages />

      <ErrorHandler>
        <Loader>
          <>
            <ConnectionLoader />
            <DialogModal />
            <GameLayout />
          </>
        </Loader>
      </ErrorHandler>
    </>
  );
}
