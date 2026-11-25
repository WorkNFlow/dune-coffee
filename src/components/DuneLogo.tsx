interface DuneLogoProps {
  width?: number | string;
  height?: number | string;
}

export function DuneLogo({ width = 64, height = 26 }: DuneLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="120 356 784 306"
      fill="none"
      stroke="#C8A97E"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'block', flex: 'none' }}
    >
      {/* Cup rim */}
      <ellipse cx="512.5" cy="402" rx="159.5" ry="26" />
      {/* Cup left wall */}
      <path d="M 353 402 C 351 440, 355 478, 366 508" />
      {/* Cup right wall */}
      <path d="M 672 402 C 674 475, 652 548, 592 594" />
      {/* Cup handle */}
      <path d="M 673 422 C 708 410, 730 432, 723 458 C 716 482, 692 496, 665 500" />
      {/* Foreground sand dune */}
      <path d="M 136 646 C 225 632, 325 501, 403 501 C 475 501, 575 628, 765 646" />
      {/* Background right sand dune */}
      <path d="M 648 530 C 715 538, 785 625, 888 646" />
      {/* Horizontal baseline */}
      <path d="M 136 646 H 888" />
    </svg>
  );
}
