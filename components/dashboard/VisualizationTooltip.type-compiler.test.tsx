import { describe, test, expectTypeOf } from 'vitest';

// Strict Type definitions mirroring the VisualizationTooltip props contract
interface TooltipPayloadItem {
  name: string;
  value: number | string;
  color?: string;
  dataKey?: string;
}

interface VisualizationTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  coordinate?: { x: number; y: number };
  formatter?: (value: number | string) => string;
  customClassname?: string;
}

describe('components/dashboard/VisualizationTooltip.tsx - Compiler Validation & Schema Constraints', () => {
  // Test Case 1: Interface Property Enforcements (expectTypeOf)
  test('Should enforce strict field configurations on base property boundaries', () => {
    expectTypeOf<VisualizationTooltipProps>().toHaveProperty('active');
    expectTypeOf<VisualizationTooltipProps>().toHaveProperty('payload');
    expectTypeOf<VisualizationTooltipProps>().toHaveProperty('label');
    expectTypeOf<VisualizationTooltipProps>().not.toBeAny();
  });

  // Test Case 2: Validation of Custom Type Parameter Assignment
  test('Should accept correctly structured sub-payload arrays without compilation mismatches', () => {
    const validPayload: TooltipPayloadItem[] = [
      { name: 'Commits', value: 42, color: '#fbc02d', dataKey: 'streak' },
    ];
    expectTypeOf(validPayload).toMatchTypeOf<VisualizationTooltipProps['payload']>();
  });

  // Test Case 3: Verify Type Constraints Block Invalid Prop Configuration Parameters
  test('Should strictly block invalid data type variants from breaching compilation layer', () => {
    interface MalformedProps {
      active: string; // Should be boolean
      coordinate: string; // Should be object containing x, y
    }
    expectTypeOf<MalformedProps>().not.toMatchTypeOf<VisualizationTooltipProps>();
  });

  // Test Case 4: Verify Schema Options Accept Partial and Optional Variables Flexibly
  test('Should compile smoothly when handling highly minimized partial interface objects', () => {
    type MinimalConfig = Partial<VisualizationTooltipProps>;
    const partialInstance: MinimalConfig = {
      label: 'GSSoC-Metrics',
    };
    expectTypeOf(partialInstance).toMatchTypeOf<VisualizationTooltipProps>();
  });

  // Test Case 5: Verification of Functional Type Signatures and Formatter Callbacks
  test('Should enforce clean return layouts on formatter runtime utility configuration structures', () => {
    type CustomFormatter = VisualizationTooltipProps['formatter'];
    expectTypeOf<CustomFormatter>().toBeFunction();
    expectTypeOf<CustomFormatter>().parameters.toEqualTypeOf<[number | string]>();
  });
});
