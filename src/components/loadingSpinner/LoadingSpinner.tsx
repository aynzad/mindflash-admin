export type LoadingProps = {
  variant?: "brand" | "white";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
};

const VARIANT_COLOR: Record<NonNullable<LoadingProps["variant"]>, string> = {
  brand: "#F47417",
  white: "#fff",
};

const SIZES: Record<NonNullable<LoadingProps["size"]>, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  "2xl": 96,
  "3xl": 128,
  "4xl": 192,
};

export const LoadingSpinner = ({
  variant = "brand",
  size = "sm",
  className,
}: LoadingProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZES[size]}
      height={SIZES[size]}
      viewBox="0 0 200 200"
      className={className}
    >
      <radialGradient
        id="a7"
        cx=".66"
        fx=".66"
        cy=".3125"
        fy=".3125"
        gradientTransform="scale(1.5)"
      >
        <stop offset="0" stop-color={VARIANT_COLOR[variant]}></stop>
        <stop
          offset=".3"
          stop-color={VARIANT_COLOR[variant]}
          stop-opacity=".9"
        ></stop>
        <stop
          offset=".6"
          stop-color={VARIANT_COLOR[variant]}
          stop-opacity=".6"
        ></stop>
        <stop
          offset=".8"
          stop-color={VARIANT_COLOR[variant]}
          stop-opacity=".3"
        ></stop>
        <stop
          offset="1"
          stop-color={VARIANT_COLOR[variant]}
          stop-opacity="0"
        ></stop>
      </radialGradient>
      <circle
        transform-origin="center"
        fill="none"
        stroke="url(#a7)"
        stroke-width="24"
        stroke-linecap="round"
        stroke-dasharray="200 1000"
        stroke-dashoffset="0"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="spline"
          dur="0.6"
          values="360;0"
          keyTimes="0;1"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
      <circle
        transform-origin="center"
        fill="none"
        opacity=".2"
        stroke={VARIANT_COLOR[variant]}
        stroke-width="24"
        stroke-linecap="round"
        cx="100"
        cy="100"
        r="70"
      ></circle>
    </svg>
  );
};
