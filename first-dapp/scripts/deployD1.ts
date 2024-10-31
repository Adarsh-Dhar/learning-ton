import { toNano } from '@ton/core';
import { D1 } from '../wrappers/D1';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const d1 = provider.open(
        D1.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('D1')
        )
    );

    await d1.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(d1.address);

    console.log('ID', await d1.getID());
}
